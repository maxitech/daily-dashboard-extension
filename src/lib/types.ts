type Location = {
  lat: string;
  lon: string;
  display_name: string;
};

type WeatherData = {
  description: string;
  icon: string;
  temp: number;
  name: string;
};

export type { WeatherData, Location };
