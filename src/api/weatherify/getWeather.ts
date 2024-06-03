import { CurrentWeatherResponse, ForecastResponse } from '../../lib/types';

export default async function getWeather<
  T = CurrentWeatherResponse | ForecastResponse
>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Something went wrong! Status: ${response.status}`);
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch weather data!', error);
    throw error;
  } finally {
    console.log('Weather fetch completed!');
  }
}
