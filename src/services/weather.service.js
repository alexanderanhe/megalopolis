const cache = require('../utils/cache');
const env = require('../config/env');
const { toISO } = require('../utils/date');
const { getProvider } = require('../providers/weather');

const provider = getProvider();

const getCacheKey = (city) => 'weather:current:' + city;

const getCurrent = async (city) => {
  const key = getCacheKey(city);
  const cached = cache.get(key);
  if (cached) return cached;

  const payload = {
    updatedAt: toISO(),
    data: await provider.getCurrent(city)
  };

  cache.set(key, payload, env.weatherCacheTtl);
  return payload;
};

const refreshCurrent = async (city) => {
  const key = getCacheKey(city);
  const payload = {
    updatedAt: toISO(),
    data: await provider.getCurrent(city)
  };

  cache.set(key, payload, env.weatherCacheTtl);
  return payload;
};

module.exports = { getCurrent, refreshCurrent };
