import './style.css';
import { getWeather } from './api/getWeather';
import { getLocation } from './api/getLocation';
import { generateWeatherCard } from './helpers/generateMarkup';
import { Location } from './lib/types';
import { WeatherData } from './lib/types';
import { generateButton } from './helpers/generateButtonMarkup';

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
    const { lat, lon, display_name } = locationData[0];
    requestWeather({ lat, lon, display_name });
    return { lat, lon, display_name };
  } catch (error) {
    console.error('Try again!', error);
  }
}

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
    toggleButtonVisibility(weather);
    handleSetDefaultLocationClick(weather);
  } catch (error) {
    console.error('Try again!', error);
  }
}

function updateLocalStorage(weatherData: WeatherData) {
  const storedWeatherData = localStorage.getItem('weather');
  const parsedStoredWeatherData = storedWeatherData
    ? JSON.parse(storedWeatherData)
    : null;

  if (
    !parsedStoredWeatherData ||
    JSON.stringify(parsedStoredWeatherData) !== JSON.stringify(weatherData)
  ) {
    localStorage.setItem('weather', JSON.stringify(weatherData));
    console.log('update local storage');
  }
}

function toggleButtonVisibility(weatherData: WeatherData) {
  if (!weatherData) return;
  const app = document.querySelector<HTMLDivElement>('#app');
  let setDefaultLocationButton = document.querySelector<HTMLButtonElement>(
    '#default-location-button'
  );

  const location = weatherData.name;
  const storedWeatherData = localStorage.getItem('weather');
  const storedLocation: string | null = storedWeatherData
    ? JSON.parse(storedWeatherData).name
    : null;

  if (!setDefaultLocationButton) setDefaultLocationButton = generateButton();

  if (storedLocation && location === storedLocation) return;

  if (app && !app.contains(setDefaultLocationButton)) {
    app.appendChild(setDefaultLocationButton);
  }
}

function handleSetDefaultLocationClick(weather: WeatherData) {
  const setDefaultLocationButton = document.querySelector<HTMLButtonElement>(
    '#default-location-button'
  );

  if (!setDefaultLocationButton) return;

  setDefaultLocationButton.addEventListener('click', () => {
    updateLocalStorage(weather);
    console.log('default location set');
    setDefaultLocationButton.disabled = true;
  });
}

function init() {
  const storedWeatherData = localStorage.getItem('weather');
  if (storedWeatherData) {
    requestLocation(JSON.parse(storedWeatherData).name);
  }
}
init();
