type CurrentWeatherResponse = {
  weather: { description: string; icon: string }[];
  main: { temp: number; feels_like: number };
};

type ForecastData = {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
};

type ForecastResponse = {
  list: ForecastData[];
};

type Location = {
  lat: string;
  lon: string;
  display_name: string;
};

type CurrentWeatherData = {
  description: string;
  icon: string;
  temp: number;
  feels_like: number;
  name: string;
};

export type {
  CurrentWeatherResponse,
  ForecastData,
  ForecastResponse,
  Location,
  CurrentWeatherData,
};
