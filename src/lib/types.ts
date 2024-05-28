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

export type { CurrentWeatherData, Location };
