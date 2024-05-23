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
    // const locationName = locationData[0].display_name;
    const { lat, lon, display_name } = locationData[0];
    requestWeather({ lat, lon, display_name });
  } catch (error) {
    console.error('Try again!', error);
  }
}

// if ('geolocation' in navigator) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const { latitude, longitude } = position.coords;
//       console.log(latitude, longitude);
//       requestWeather({ lat: latitude.toString(), lon: longitude.toString() });
//     },
//     (error) => {
//       console.error(error.message);
//       requestWeather({ lat: '48.137154', lon: '	11.576124' });
//     },
//     { enableHighAccuracy: true }
//   );
// } else {
//   console.log('Geolocation is not supported by this browser.');
// }

// requestWeather({ lat: '48.137154', lon: '	11.576124' });

async function requestWeather({ lat, lon, display_name }: Location) {
  try {
    const response = (await getWeather(Number(lat), Number(lon))) as any;
    const weather: WeatherData = {
      description: response.weather[0].description,
      icon: response.weather[0].icon,
      temp: response.main.temp,
      name: display_name,
    };
    generateWeatherCard(weather);
    console.log(response);
  } catch (error) {
    console.error('Try again!', error);
  }
}
