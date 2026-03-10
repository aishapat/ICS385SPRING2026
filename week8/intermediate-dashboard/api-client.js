// api-client.js - handles all the API calls in one place
// includes caching so we dont call the API too much
// includes fallback data if an API is down

class UnifiedApiClient {
    constructor(config) {
      this.config = config;
      this.cache = new Map(); // stores saved responses
      this.rateLimiters = new Map(); // tracks how many requests we made
      this.initializeRateLimiters();
    }
  
    // set up rate limiters for each API
    initializeRateLimiters() {
      if (!this.config || !this.config.apis) return; // stop if config isnt ready yet
      Object.keys(this.config.apis).forEach(service => {
        this.rateLimiters.set(service, {
          requests: [],
          limit: this.config.apis[service].rateLimit.requests,
          period: this.config.apis[service].rateLimit.period
        });
      });
    }
  
    // main function to make API requests
    async makeRequest(service, endpoint, params = {}, options = {}) {
      try {
        // dont make the request if we hit the rate limit
        if (!this.checkRateLimit(service)) {
          throw new Error('Rate limit exceeded for ' + service + '. Please wait.');
        }
  
        // return saved data if its still fresh
        const cacheKey = this.getCacheKey(service, endpoint, params);
        if (this.isValidCache(cacheKey)) {
          console.log('Returning cached data for', service);
          return this.cache.get(cacheKey).data;
        }
  
        // build and send the request
        const requestConfig = this.buildRequest(service, endpoint, params, options);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.apis[service].timeout);
  
        const response = await fetch(requestConfig.url, {
          ...requestConfig.options,
          signal: controller.signal
        });
        clearTimeout(timeoutId);
  
        if (!response.ok) throw new Error(service + ' API error: ' + response.status);
  
        const data = await response.json();
  
        // save the response so we dont call again right away
        this.cacheResponse(cacheKey, data);
        this.updateRateLimit(service);
        return data;
      } catch (error) {
        console.error('API request failed for ' + service + ':', error.message);
        // if it fails, return backup data instead of breaking the page
        return this.handleApiError(service, endpoint, error);
      }
    }
  
    // build the URL and headers for each API differently
    buildRequest(service, endpoint, params, options) {
      const apiConfig = this.config.apis[service];
      let url = apiConfig.baseUrl + endpoint;
      const headers = { 'Content-Type': 'application/json', ...options.headers };
  
      switch (service) {
        case 'openWeather':
          // OpenWeather needs the API key in the URL
          const weatherParams = new URLSearchParams({ ...params, appid: apiConfig.key, units: 'imperial' });
          url += '?' + weatherParams.toString();
          break;
        case 'rapidApi':
          // RapidAPI needs the key in the headers
          headers['X-RapidAPI-Key'] = apiConfig.key;
          headers['X-RapidAPI-Host'] = apiConfig.host;
          break;
        case 'jokeApi':
          // JokeAPI just needs the params in the URL, no key needed
          if (Object.keys(params).length > 0) url += '?' + new URLSearchParams(params).toString();
          break;
      }
  
      return { url, options: { method: 'GET', headers } };
    }
  
    // check if we are under the rate limit
    checkRateLimit(service) {
      const limiter = this.rateLimiters.get(service);
      const now = Date.now();
      limiter.requests = limiter.requests.filter(time => now - time < limiter.period);
      return limiter.requests.length < limiter.limit;
    }
  
    // log the time of this request
    updateRateLimit(service) {
      this.rateLimiters.get(service).requests.push(Date.now());
    }
  
    getCacheKey(service, endpoint, params) {
      return service + ':' + endpoint + ':' + JSON.stringify(params);
    }
  
    // check if the cached data is still fresh
    isValidCache(cacheKey) {
      if (!this.cache.has(cacheKey)) return false;
      return Date.now() - this.cache.get(cacheKey).timestamp < this.config.app.cacheExpiry;
    }
  
    // save the response with a timestamp
    cacheResponse(cacheKey, data) {
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
    }
  
    // if the API fails, return backup data so the page still works
    handleApiError(service, endpoint, error) {
      switch (service) {
        case 'openWeather':
          return {
            name: 'Kahului',
            main: { temp: 78, humidity: 65 },
            weather: [{ description: 'partly cloudy', icon: '02d' }],
            wind: { speed: 12 },
            error: true,
            message: 'Weather data temporarily unavailable - showing cached data'
          };
        case 'rapidApi':
          return {
            value: "Chuck Norris can divide by zero.",
            error: true,
            message: 'Chuck Norris jokes temporarily unavailable'
          };
        case 'jokeApi':
          return {
            joke: 'Why do programmers prefer dark mode? Because light attracts bugs!',
            error: true,
            message: 'Programming jokes temporarily unavailable'
          };
        default:
          throw error;
      }
    }
  
    // get weather for a city, default is Kahului
    async getWeather(city = 'Kahului') {
      return this.makeRequest('openWeather', '/weather', { q: city + ',US' });
    }
  
    // get a random Chuck Norris joke from RapidAPI
    async getChuckNorrisJoke() {
      return this.makeRequest('rapidApi', '/jokes/random');
    }
  
    // get a programming joke from JokeAPI
    async getProgrammingJoke() {
      return this.makeRequest('jokeApi', '/joke/Programming', { type: 'single' });
    }
  
    // get both jokes at the same time using Promise.allSettled
    async getAllJokes() {
      try {
        const [chuck, programming] = await Promise.allSettled([
          this.getChuckNorrisJoke(),
          this.getProgrammingJoke()
        ]);
        return {
          chuck: chuck.status === 'fulfilled' ? chuck.value : null,
          programming: programming.status === 'fulfilled' ? programming.value : null
        };
      } catch (error) {
        console.error('Failed to fetch jokes:', error);
        return { chuck: null, programming: null };
      }
    }
  }