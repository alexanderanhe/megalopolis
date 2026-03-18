import morgan from 'morgan';
import env from '../config/env';

const logger = morgan(env.nodeEnv === 'production' ? 'combined' : 'dev');

export default logger;
