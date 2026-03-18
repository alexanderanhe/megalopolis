const morgan = require('morgan');
const env = require('../config/env');

const logger = morgan(env.nodeEnv === 'production' ? 'combined' : 'dev');

module.exports = logger;
