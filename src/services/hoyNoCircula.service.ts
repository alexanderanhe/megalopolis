import cache from '../utils/cache';
import env from '../config/env';
import { toISO } from '../utils/date';
import { getProvider } from '../providers/hoyNoCircula';
import { HoyNoCirculaData } from '../providers/hoyNoCircula/provider';

const CACHE_KEY = 'hnc:today';
const provider = getProvider();

type HncPayload = {
  updatedAt: string;
  data: HoyNoCirculaData;
};

const getToday = async (): Promise<HncPayload> => {
  const cached = cache.get<HncPayload>(CACHE_KEY);
  if (cached) return cached;

  const payload = {
    updatedAt: toISO(),
    data: await provider.getToday()
  };

  cache.set(CACHE_KEY, payload, env.hncCacheTtl);
  return payload;
};

const refreshToday = async (): Promise<HncPayload> => {
  const payload = {
    updatedAt: toISO(),
    data: await provider.getToday()
  };

  cache.set(CACHE_KEY, payload, env.hncCacheTtl);
  return payload;
};

export { getToday, refreshToday };
