import WeatherProvider, { WeatherData } from './provider';

export default class WeatherMockProvider extends WeatherProvider {
  async getCurrent(city: string): Promise<WeatherData> {
    return {
      city,
      temperatureC: 22,
      humidity: 48,
      condition: 'Parcialmente nublado',
      windKph: 12
    };
  }
}
