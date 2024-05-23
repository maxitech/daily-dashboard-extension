import './style.css';
import { getWeather } from './api/getWeather';
import { getLocation } from './api/getLocation';

type Location = {
  lat: string;
  lon: string;
};

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
    const weather = await getWeather(Number(lat), Number(lon));
    const weatherIcon = weather.weather[0].icon;
    console.log(weather);
  } catch (error) {
    console.error('Try again!', error);
  }
}
