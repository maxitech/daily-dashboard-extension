import { CurrentWeatherResponse, ForecastResponse } from '../../lib/types';

const spinner =
  '<div id="spinner" class=""><span class="loading loading-spinner loading-lg"></span></div>';

export default async function getWeather<
  T = CurrentWeatherResponse | ForecastResponse
>(url: string, container: HTMLDivElement | null): Promise<T> {
  try {
    if (container) container.innerHTML = spinner;
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

    const spinnerElement = document.querySelector('#spinner');
    if (spinnerElement && container?.contains(spinnerElement)) {
      container.removeChild(spinnerElement);
    }
  }
}
