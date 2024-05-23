type Location = {
  lat: string;
  lon: string;
};

type WeatherData = {
  description: string;
  icon: string;
  temp: number;
  name: string;
};

export type { WeatherData, Location };
