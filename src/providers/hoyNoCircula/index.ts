import env from '../../config/env';
import HoyNoCirculaMockProvider from './mock.provider';
import HoyNoCirculaProvider from './provider';

const getProvider = (): HoyNoCirculaProvider => {
  if (env.hncProvider === 'mock') return new HoyNoCirculaMockProvider();
  throw new Error('Unknown HNC provider: ' + env.hncProvider);
};

export { getProvider };
