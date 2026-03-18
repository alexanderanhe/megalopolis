const WeatherProvider = require('./provider');

class WeatherMockProvider extends WeatherProvider {
  async getCurrent(city) {
    return {
      city,
      temperatureC: 22,
      humidity: 48,
      condition: 'Parcialmente nublado',
      windKph: 12
    };
  }
}

module.exports = WeatherMockProvider;
