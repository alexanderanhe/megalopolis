import { WeatherData } from '../providers/weather/provider';

type WeatherComputed = {
  temperatureLabel: string;
  humidityLabel: string;
  windLabel: string;
};

const formatNumber = (value: number) => (Number.isInteger(value) ? String(value) : value.toFixed(1));

const buildWeatherComputed = (data: WeatherData): WeatherComputed => {
  return {
    temperatureLabel: `${formatNumber(data.temperatureC)}°C`,
    humidityLabel: `${formatNumber(data.humidity)}% humedad`,
    windLabel: `${formatNumber(data.windKph)} km/h`
  };
};

export { buildWeatherComputed };
