import cache from '../utils/cache';
import env from '../config/env';
import { toISO } from '../utils/date';
import { getProvider } from '../providers/weather';
import { WeatherData } from '../providers/weather/provider';

const provider = getProvider();

const getCacheKey = (city: string) => 'weather:current:' + city;

type WeatherPayload = {
  updatedAt: string;
  data: WeatherData;
};

const getCurrent = async (city: string): Promise<WeatherPayload> => {
  const key = getCacheKey(city);
  const cached = cache.get<WeatherPayload>(key);
  if (cached) return cached;

  const payload = {
    updatedAt: toISO(),
    data: await provider.getCurrent(city)
  };

  cache.set(key, payload, env.weatherCacheTtl);
  return payload;
};

const refreshCurrent = async (city: string): Promise<WeatherPayload> => {
  const key = getCacheKey(city);
  const payload = {
    updatedAt: toISO(),
    data: await provider.getCurrent(city)
  };

  cache.set(key, payload, env.weatherCacheTtl);
  return payload;
};

export { getCurrent, refreshCurrent };
