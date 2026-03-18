export type WeatherData = {
  city: string;
  temperatureC: number;
  humidity: number;
  condition: string;
  windKph: number;
};

export default abstract class WeatherProvider {
  abstract getCurrent(city: string): Promise<WeatherData>;
}
