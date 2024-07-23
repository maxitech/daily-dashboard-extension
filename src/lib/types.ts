type CurrentWeatherResponse = {
  weather: { description: string; icon: string }[];
  main: { temp: number; feels_like: number };
  dt: number;
  timezone: number;
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
  name: string;
  local_names: { de: string } | null;
};

type CurrentWeatherData = {
  description: string;
  icon: string;
  temp: number;
  feels_like: number;
  name: string;
  local_names: { de: string } | null;
  dt: number;
  timezone: number;
};

export type {
  CurrentWeatherResponse,
  ForecastData,
  ForecastResponse,
  Location,
  CurrentWeatherData,
};
