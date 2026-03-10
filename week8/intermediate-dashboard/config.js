// config.js - handles all the API settings and keys
// keys are saved in the browser's localStorage, not hardcoded here

class SecureConfig {
    constructor() {
      // load the settings when the page starts
      this.config = this.loadConfiguration();
    }
  
    loadConfiguration() {
      return {
        apis: {
          // OpenWeatherMap settings - needs an API key
          openWeather: {
            key: this.getSecureApiKey('openweather'),
            baseUrl: 'https://api.openweathermap.org/data/2.5',
            endpoints: { current: '/weather', forecast: '/forecast' },
            rateLimit: { requests: 60, period: 60000 }, // max 60 requests per minute
            timeout: 5000 // stop waiting after 5 seconds
          },
          // RapidAPI settings for Chuck Norris jokes - needs an API key
          rapidApi: {
            key: this.getSecureApiKey('rapidapi'),
            host: 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
            baseUrl: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
            endpoints: { random: '/jokes/random' },
            rateLimit: { requests: 100, period: 60000 },
            timeout: 3000
          },
          // JokeAPI settings - no key needed for this one
          jokeApi: {
            baseUrl: 'https://v2.jokeapi.dev',
            endpoints: { joke: '/joke/Programming' },
            rateLimit: { requests: 120, period: 60000 },
            timeout: 3000
          }
        },
        // general app settings
        app: {
          name: 'UH Maui Campus Dashboard',
          version: '1.0.0',
          defaultCity: 'Kahului',
          refreshInterval: 10 * 60 * 1000, // refresh weather every 10 minutes
          cacheExpiry: 10 * 60 * 1000, // cache data for 10 minutes
          maxRetries: 3,
          retryDelay: 1000
        },
        ui: {
          animationDuration: 300,
          toastDuration: 5000,
          modalTimeout: 10000,
          loadingDelay: 500
        }
      };
    }
  
    // get the API key from localStorage
    getSecureApiKey(service) {
      return localStorage.getItem(service + '_api_key') || null;
    }
  
    // check if both keys are saved
    hasRequiredKeys() {
      return !!(localStorage.getItem('openweather_api_key') && localStorage.getItem('rapidapi_api_key'));
    }
  
    // warn in console if any keys are missing
    validateConfiguration() {
      const required = ['openweather_api_key', 'rapidapi_api_key'];
      const missing = required.filter(key => !localStorage.getItem(key));
      if (missing.length > 0) {
        console.warn('Missing API keys:', missing.join(', '), '- using fallback data');
      }
    }
  
    getApiConfig(service) {
      if (!this.config.apis[service]) throw new Error('Unknown API service: ' + service);
      return this.config.apis[service];
    }
  
    getAppConfig() { return this.config.app; }
    getUiConfig() { return this.config.ui; }
  }
  
  // create one config object that all other files can use
  const appConfig = new SecureConfig();