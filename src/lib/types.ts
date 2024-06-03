type CurrentWeatherResponse = {
  weather: { description: string; icon: string }[];
  main: { temp: number };
};

type ForecastResponse = {
  dt: number;
  dt_txt: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}[];

type Location = {
  lat: string;
  lon: string;
  display_name: string;
};

type CurrentWeatherData = {
  description: string;
  icon: string;
  temp: number;
  name: string;
};

export type {
  CurrentWeatherResponse,
  ForecastResponse,
  Location,
  CurrentWeatherData,
};
