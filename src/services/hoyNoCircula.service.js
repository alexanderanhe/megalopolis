const cache = require('../utils/cache');
const env = require('../config/env');
const { toISO } = require('../utils/date');
const { getProvider } = require('../providers/hoyNoCircula');

const CACHE_KEY = 'hnc:today';
const provider = getProvider();

const getToday = async () => {
  const cached = cache.get(CACHE_KEY);
  if (cached) return cached;

  const payload = {
    updatedAt: toISO(),
    data: await provider.getToday()
  };

  cache.set(CACHE_KEY, payload, env.hncCacheTtl);
  return payload;
};

const refreshToday = async () => {
  const payload = {
    updatedAt: toISO(),
    data: await provider.getToday()
  };

  cache.set(CACHE_KEY, payload, env.hncCacheTtl);
  return payload;
};

module.exports = { getToday, refreshToday };
