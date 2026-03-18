const env = require('../../config/env');
const WeatherMockProvider = require('./mock.provider');

const getProvider = () => {
  if (env.weatherProvider === 'mock') return new WeatherMockProvider();
  throw new Error('Unknown weather provider: ' + env.weatherProvider);
};

module.exports = { getProvider };
