import dotenv from 'dotenv';

dotenv.config();

const toInt = (value: string | undefined, fallback: number) => {
  const n = Number.parseInt(value ?? '', 10);
  return Number.isNaN(n) ? fallback : n;
};

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: toInt(process.env.PORT, 3000),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  trustProxy: process.env.TRUST_PROXY || '',
  apiBaseUrl: process.env.API_BASE_URL || '',
  cacheTtlDefault: toInt(process.env.CACHE_TTL_DEFAULT, 300),
  weatherCacheTtl: toInt(process.env.WEATHER_CACHE_TTL, 300),
  hncCacheTtl: toInt(process.env.HNC_CACHE_TTL, 3600),
  weatherProvider: process.env.WEATHER_PROVIDER || 'mock',
  hncProvider: process.env.HNC_PROVIDER || 'mock',
  rateLimitWindowMs: toInt(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  rateLimitMax: toInt(process.env.RATE_LIMIT_MAX, 300)
};

export default env;
