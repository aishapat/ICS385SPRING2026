// dashboard.js - main file that controls everything on the page
// connects the weather, jokes, and courses together

class CampusDashboard {
    constructor() {
      this.config = appConfig; // from config.js
      this.apiClient = new UnifiedApiClient(this.config); // from api-client.js
      this.courseCatalog = new CourseCatalog(); // from course-catalog.js
      this.lastUpdated = new Map(); // tracks when each widget was last updated
      this.refreshTimers = new Map(); // stores the auto refresh timers
      this.initialize();
    }
  
    async initialize() {
      try {
        this.setupEventListeners();
        // show the API key popup if keys arent saved yet
        if (!this.config.hasRequiredKeys()) {
          this.showApiKeySetupModal();
        }
        await this.loadInitialData();
        this.startAutoRefresh();
      } catch (error) {
        this.handleInitializationError(error);
      }
    }
  
    // set up all the button and input listeners
    setupEventListeners() {
      const searchInput = document.getElementById('courseSearch');
      if (searchInput) searchInput.addEventListener('input', () => this.handleSearch());
  
      const deptFilter = document.getElementById('departmentFilter');
      if (deptFilter) deptFilter.addEventListener('change', () => this.handleSearch());
  
      const settingsBtn = document.getElementById('settingsBtn');
      if (settingsBtn) settingsBtn.addEventListener('click', () => this.showApiKeySetupModal());
  
      const refreshBtn = document.getElementById('refreshAllBtn');
      if (refreshBtn) refreshBtn.addEventListener('click', () => this.refreshAll());
    }
  
    // load all data when the page first opens
    async loadInitialData() {
      this.showLoadingState();
      try {
        // load courses, weather, and jokes all at the same time
        await Promise.allSettled([
          this.loadCourseData(),
          this.loadWeatherData(),
          this.loadHumorData()
        ]);
        this.updateDashboardStats();
      } catch (error) {
        console.error('Failed to load initial data:', error);
      } finally {
        this.hideLoadingState();
      }
    }
  
    // load courses from JSON file
    async loadCourseData() {
      await this.courseCatalog.loadCourses();
      this.courseCatalog.renderCourses();
    }
  
    // run search and filter when user types or changes dropdown
    handleSearch() {
      const searchTerm = document.getElementById('courseSearch').value;
      const department = document.getElementById('departmentFilter').value;
      this.courseCatalog.filterCourses(searchTerm, department);
      this.updateDashboardStats();
    }
  
    // call the weather API and show the result
    async loadWeatherData() {
      try {
        const weatherData = await this.apiClient.getWeather();
        this.displayWeatherWidget(weatherData);
        this.lastUpdated.set('weather', Date.now());
      } catch (error) {
        console.error('Weather loading failed:', error);
      }
    }
  
    // call the joke APIs and show the result
    async loadHumorData() {
      try {
        const jokes = await this.apiClient.getAllJokes();
        this.displayHumorWidget(jokes);
        this.lastUpdated.set('humor', Date.now());
      } catch (error) {
        console.error('Humor loading failed:', error);
      }
    }
  
    // build and show the weather widget HTML
    displayWeatherWidget(data) {
      const container = document.getElementById('weather-widget');
      if (!container) return;
      const isError = data.error;
      // get the weather icon image from OpenWeatherMap
      const iconUrl = data.weather && !isError
        ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : '';
  
      container.innerHTML = `
        <div class="widget-header">
          <h3>🌤 Campus Weather</h3>
          <span class="last-updated">${this.getTimeAgo('weather')}</span>
        </div>
        <div class="weather-content ${isError ? 'error-state' : ''}">
          <div class="weather-main">
            ${iconUrl ? `<img src="${iconUrl}" alt="weather icon" class="weather-icon">` : ''}
            <div>
              <div class="location">📍 ${data.name}, Hawaii</div>
              <div class="temperature">${Math.round(data.main.temp)}°F</div>
              <div class="description">${data.weather[0].description}</div>
            </div>
          </div>
          <div class="weather-details">
            <span>💧 Humidity: ${data.main.humidity}%</span>
            <span>💨 Wind: ${data.wind.speed} mph</span>
          </div>
          ${isError ? `<div class="error-message">⚠️ ${data.message}</div>` : ''}
        </div>
      `;
    }
  
    // build and show the humor widget HTML
    displayHumorWidget(jokes) {
      const container = document.getElementById('humor-widget');
      if (!container) return;
  
      // use fallback text if jokes didnt load
      const chuckJoke = jokes && jokes.chuck
        ? (jokes.chuck.value || 'Chuck Norris joke unavailable')
        : 'Chuck Norris joke unavailable';
  
      const progJoke = jokes && jokes.programming
        ? (jokes.programming.joke || (jokes.programming.setup + ' ' + jokes.programming.delivery))
        : 'Programming joke unavailable';
  
      container.innerHTML = `
        <div class="widget-header">
          <h3>😄 Campus Humor</h3>
          <button class="refresh-btn" onclick="dashboard.refreshHumor()">New Jokes</button>
        </div>
        <div class="humor-content">
          <div class="joke-section">
            <h4>💪 Chuck Norris Fact</h4>
            <p class="joke-text">${chuckJoke}</p>
          </div>
          <div class="joke-section">
            <h4>💻 Programming Humor</h4>
            <p class="joke-text">${progJoke}</p>
          </div>
        </div>
      `;
    }
  
    // update the stat numbers at the top of the page
    updateDashboardStats() {
      const totalCourses = this.courseCatalog.courses.length;
      const totalStudents = this.courseCatalog.getTotalEnrollment();
      const avgCapacity = this.courseCatalog.getAverageCapacity();
      // show connected or offline based on if weather loaded
      const apiStatus = this.lastUpdated.has('weather') ? '✅ Connected' : '⚠️ Offline';
  
      const el = (id) => document.getElementById(id);
      if (el('total-courses')) el('total-courses').textContent = totalCourses;
      if (el('total-students')) el('total-students').textContent = totalStudents;
      if (el('avg-capacity')) el('avg-capacity').textContent = avgCapacity + '%';
      if (el('api-status')) el('api-status').textContent = apiStatus;
    }
  
    // auto refresh weather every 10 minutes
    startAutoRefresh() {
      this.refreshTimers.set('weather', setInterval(() => {
        this.loadWeatherData();
      }, 10 * 60 * 1000));
    }
  
    // refresh everything when the refresh all button is clicked
    async refreshAll() {
      const btn = document.getElementById('refreshAllBtn');
      if (btn) { btn.textContent = 'Refreshing...'; btn.disabled = true; }
      await this.loadInitialData();
      if (btn) { btn.textContent = '🔄 Refresh All'; btn.disabled = false; }
    }
  
    // get new jokes when the new jokes button is clicked
    async refreshHumor() {
      const btn = document.querySelector('.refresh-btn');
      if (btn) { btn.textContent = 'Loading...'; btn.disabled = true; }
      // clear the joke cache so it fetches new ones
      this.apiClient.cache.forEach((_, key) => {
        if (key.includes('rapidApi') || key.includes('jokeApi')) {
          this.apiClient.cache.delete(key);
        }
      });
      await this.loadHumorData();
      if (btn) { btn.textContent = 'New Jokes'; btn.disabled = false; }
    }
  
    // clear weather cache and get fresh data
    async refreshWeather() {
      this.apiClient.cache.forEach((_, key) => {
        if (key.includes('openWeather')) this.apiClient.cache.delete(key);
      });
      await this.loadWeatherData();
      this.updateDashboardStats();
    }
  
    addNewCourse() {
      alert('Course management: Add Course feature coming soon!');
    }
  
    // download course data as a JSON file
    exportData() {
      this.courseCatalog.exportData();
    }
  
    // show the API key popup
    showApiKeySetupModal() {
      const modal = document.getElementById('apiKeyModal');
      if (modal) modal.style.display = 'flex';
    }
  
    // save the API keys to localStorage and reload the page
    saveApiKeys() {
      const openWeatherKey = document.getElementById('openWeatherKey').value.trim();
      const rapidApiKey = document.getElementById('rapidApiKey').value.trim();
      if (!openWeatherKey || !rapidApiKey) {
        alert('Please enter both API keys before saving.');
        return;
      }
      localStorage.setItem('openweather_api_key', openWeatherKey);
      localStorage.setItem('rapidapi_api_key', rapidApiKey);
      document.getElementById('apiKeyModal').style.display = 'none';
      window.location.reload(); // reload so the keys take effect
    }
  
    // show how long ago the widget was updated
    getTimeAgo(service) {
      if (!this.lastUpdated.has(service)) return 'Never updated';
      const minutes = Math.floor((Date.now() - this.lastUpdated.get(service)) / 60000);
      return minutes === 0 ? 'Just now' : `${minutes} min ago`;
    }
  
    // show an error message if the dashboard fails to load
    handleInitializationError(error) {
      console.error('Dashboard initialization failed:', error);
      const container = document.getElementById('dashboard-container');
      if (container) {
        container.innerHTML = `
          <div class="initialization-error">
            <h2>Dashboard Initialization Failed</h2>
            <p>${error.message}</p>
            <button onclick="location.reload()">Retry</button>
          </div>
        `;
      }
    }
  
    showLoadingState() {
      document.querySelectorAll('.loading').forEach(el => el.style.display = 'block');
    }
  
    hideLoadingState() {
      document.querySelectorAll('.loading').forEach(el => el.style.display = 'none');
    }
  }
  
  // start the dashboard once the page fully loads
  document.addEventListener('DOMContentLoaded', function () {
    window.dashboard = new CampusDashboard();
  });