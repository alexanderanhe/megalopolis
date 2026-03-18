const cron = require('node-cron');
const hoyNoCirculaService = require('../services/hoyNoCircula.service');
const weatherService = require('../services/weather.service');

const DEFAULT_CITY = 'cdmx';

const startRefreshCacheJob = () => {
  cron.schedule('*/30 * * * *', async () => {
    try {
      await Promise.all([
        hoyNoCirculaService.refreshToday(),
        weatherService.refreshCurrent(DEFAULT_CITY)
      ]);
    } catch (err) {
      console.error('Cache refresh job failed', err);
    }
  });
};

module.exports = { startRefreshCacheJob };
