import env from '../../config/env';
import WeatherMockProvider from './mock.provider';
import WeatherProvider from './provider';

const getProvider = (): WeatherProvider => {
  if (env.weatherProvider === 'mock') return new WeatherMockProvider();
  throw new Error('Unknown weather provider: ' + env.weatherProvider);
};

export { getProvider };
