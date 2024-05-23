import './style.css';
import { getWeather } from './api/getWeather';
import { getLocation } from './api/getLocation';
import { generateWeatherCard } from './helpers/generateMarkup';
import { Location } from './lib/types';
import { WeatherData } from './lib/types';

const form = document.querySelector<HTMLFormElement>('#form');
const input = document.querySelector<HTMLInputElement>('#location-input');

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value == '' || input?.value == null) return;
  const location = input.value;
  requestLocation(location);
  input.value = '';
});

async function requestLocation(location: string) {
  try {
    const locationData = (await getLocation(location)) as Location[];
    const { lat, lon } = locationData[0];
    requestWeather({ lat, lon });
  } catch (error) {
    console.error('Try again!', error);
  }
}

async function requestWeather({ lat, lon }: Location) {
  try {
    const response = (await getWeather(Number(lat), Number(lon))) as any;
    const weather: WeatherData = {
      description: response.weather[0].description,
      icon: response.weather[0].icon,
      temp: response.main.temp,
      name: response.name,
    };

    generateWeatherCard(weather);
    console.log(weather);
  } catch (error) {
    console.error('Try again!', error);
  }
}
