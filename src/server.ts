import app from './app';
import env from './config/env';
import { startRefreshCacheJob } from './jobs/refreshCache.job';

app.listen(env.port, () => {
  console.log('Server running on port ' + env.port);
  startRefreshCacheJob();
});
