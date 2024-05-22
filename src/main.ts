import './style.css';

import { getWeather } from './api/getWeather';
import { getLocation } from './api/getLocation';

type Location = {
  display_name: string;
  lat: string;
  lon: string;
};

const form = document.querySelector<HTMLFormElement>('#form');
const input = document.querySelector<HTMLInputElement>('#location-input');

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value == '' || input?.value == null) return;
  const location = input?.value;
  requestLocation(location);
});

async function requestLocation(location: string) {
  try {
    const locationData = (await getLocation(location)) as Location[];
    const { lat, lon } = locationData[0];
    const weather = await getWeather(Number(lat), Number(lon));
    console.log(weather.current);
  } catch (error) {
    console.error('Try again!', error);
  }
}
