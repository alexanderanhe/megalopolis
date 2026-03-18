const app = require('./app');
const env = require('./config/env');
const { startRefreshCacheJob } = require('./jobs/refreshCache.job');

app.listen(env.port, () => {
  console.log('Server running on port ' + env.port);
  startRefreshCacheJob();
});
