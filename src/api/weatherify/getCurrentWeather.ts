const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

export default async function getWeather(lat: number, lon: number) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=de`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Something went wrong! Status: ${response.status}`);
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const data: unknown = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch weather data!', error);
    throw error;
  } finally {
    console.log('Weather fetch completed!');
  }
}
