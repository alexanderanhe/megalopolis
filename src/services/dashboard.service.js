const hoyNoCirculaService = require('./hoyNoCircula.service');
const weatherService = require('./weather.service');
const { toISO } = require('../utils/date');

const DEFAULT_CITY = 'cdmx';

const getHome = async () => {
  const [hnc, weather] = await Promise.all([
    hoyNoCirculaService.getToday(),
    weatherService.getCurrent(DEFAULT_CITY)
  ]);

  return {
    updatedAt: toISO(),
    data: {
      hoyNoCircula: hnc.data,
      weather: weather.data
    }
  };
};

module.exports = { getHome };
