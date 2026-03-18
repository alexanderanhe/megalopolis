import { getToday } from './hoyNoCircula.service';
import { getCurrent } from './weather.service';
import { toISO } from '../utils/date';

const DEFAULT_CITY = 'cdmx';

const getHome = async () => {
  const [hnc, weather] = await Promise.all([
    getToday(),
    getCurrent(DEFAULT_CITY)
  ]);

  return {
    updatedAt: toISO(),
    data: {
      hoyNoCircula: hnc.data,
      weather: weather.data
    }
  };
};

export { getHome };
