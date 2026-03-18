const env = require('../../config/env');
const HoyNoCirculaMockProvider = require('./mock.provider');

const getProvider = () => {
  if (env.hncProvider === 'mock') return new HoyNoCirculaMockProvider();
  throw new Error('Unknown HNC provider: ' + env.hncProvider);
};

module.exports = { getProvider };
