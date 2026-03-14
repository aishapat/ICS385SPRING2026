// weather.js - fetches current weather for Wailuku, Maui
// uses OpenWeatherMap API with latitude and longitude

// coordinates for Wailuku, Maui
const lat = '20.902969';
const lon = '-156.491129';

// API key stored in .env file (replace with your key)
const apiKey = '8773ec9a78c3039283cab768c19186c5';

// build the API URL using latitude and longitude
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

// fetch weather data from OpenWeatherMap
fetch(url)
  .then(response => {
    // check if request was successful
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    return response.json();
  })
  .then(data => {
    // extract necessary info from the API response
    const description = data.weather[0].description;
    const temp = Math.round(data.main.temp);
    const icon = data.weather[0].icon;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const cloudiness = data.clouds.all;

    // build icon URL
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // display weather data in the card
    document.getElementById('weather-content').innerHTML = `
      <div class="location">Wailuku, Maui, Hawaii</div>
      <div class="location">Lat: ${lat} | Lon: ${lon}</div>
      <img src="${iconUrl}" alt="weather icon" class="weather-icon">
      <div class="temperature">${temp}°F</div>
      <div class="description">${description}</div>
      <div class="details">
        <div class="detail-item">
          <div class="detail-label">Humidity</div>
          <div class="detail-value">${humidity}%</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Wind Speed</div>
          <div class="detail-value">${windSpeed} mph</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Cloudiness</div>
          <div class="detail-value">${cloudiness}%</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Condition</div>
          <div class="detail-value">${description}</div>
        </div>
      </div>
    `;
  })
  .catch(error => {
    // show error message if request fails
    console.error('Error fetching weather:', error);
    document.getElementById('weather-content').innerHTML = `
      <p class="error">Could not load weather data. Please try again.</p>
    `;
  });
