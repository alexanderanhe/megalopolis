import cron from 'node-cron';
import { refreshToday } from '../services/hoyNoCircula.service';
import { refreshCurrent } from '../services/weather.service';

const DEFAULT_CITY = 'cdmx';

const startRefreshCacheJob = () => {
  cron.schedule('*/30 * * * *', async () => {
    try {
      await Promise.all([
        refreshToday(),
        refreshCurrent(DEFAULT_CITY)
      ]);
    } catch (err) {
      console.error('Cache refresh job failed', err);
    }
  });
};

export { startRefreshCacheJob };
