type WeatherResponse = {
  weather: { description: string; icon: string }[];
  main: { temp: number };
};

export default async function getWeather(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Something went wrong! Status: ${response.status}`);
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const data: WeatherResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch weather data!', error);
    throw error;
  } finally {
    console.log('Weather fetch completed!');
  }
}
