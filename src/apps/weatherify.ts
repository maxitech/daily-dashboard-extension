import '../style.css';
import getWeather from '../api/weatherify/getWeather';
import getLocation from '../api/weatherify/getLocation';
import generateWeatherCard from '../helpers/weatherify/generateWeatherCardMarkup';
import { CurrentWeatherData, Location } from '../lib/types';
import generateButton from '../helpers/weatherify/generateButtonMarkup';
import cloneButton from '../helpers/weatherify/cloneButton';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

function handleInput() {
  const form = document.querySelector<HTMLFormElement>('#form');
  const input = document.querySelector<HTMLInputElement>('#location-input');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input?.value == '' || input?.value == null) return;

    const location = input.value;

    requestLocation(location);
    input.value = '';
  });
}

async function requestLocation(location: string) {
  try {
    const locationData = (await getLocation(location)) as Location[];
    const { lat, lon, display_name } = locationData[0];
    requestWeather({ lat, lon, display_name });
  } catch (error) {
    console.error('Try again!', error);
  }
}

async function requestWeather(location: Location) {
  const { lat, lon, display_name } = location;
  const url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${Number(
    lat
  )}&lon=${Number(lon)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=de`;
  try {
    const response = (await getWeather(url)) as any;
    const weather: CurrentWeatherData = {
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

function updateLocalStorage(weatherData: CurrentWeatherData) {
  const storedWeatherData = localStorage.getItem('weather');
  const parsedStoredWeatherData: CurrentWeatherData | null = storedWeatherData
    ? JSON.parse(storedWeatherData)
    : null;

  if (
    !parsedStoredWeatherData ||
    JSON.stringify(parsedStoredWeatherData) !== JSON.stringify(weatherData.name)
  ) {
    localStorage.setItem('weather', JSON.stringify(weatherData.name));
    console.log('update local storage');
  }
}

function toggleButtonVisibility(weatherData: CurrentWeatherData) {
  if (!weatherData) return;
  const app = document.querySelector<HTMLDivElement>('#app');
  let setDefaultLocationButton = document.querySelector<HTMLButtonElement>(
    '#default-location-button'
  );

  const location = weatherData.name;
  const storedWeatherData = localStorage.getItem('weather');
  const storedLocation: string | null = storedWeatherData
    ? JSON.parse(storedWeatherData)
    : null;

  if (!setDefaultLocationButton)
    setDefaultLocationButton = generateButton(
      'Set as default location',
      'default-location-button'
    );

  if (storedLocation && location === storedLocation) return;

  if (app && !app.contains(setDefaultLocationButton)) {
    app.appendChild(setDefaultLocationButton);
  }
}

function handleSetDefaultLocationClick(weather: CurrentWeatherData) {
  let setDefaultLocationButton = document.querySelector<HTMLButtonElement>(
    '#default-location-button'
  );
  if (!setDefaultLocationButton) return;

  setDefaultLocationButton.disabled = false;

  // Clone the button to remove the event listener
  setDefaultLocationButton = cloneButton(setDefaultLocationButton);

  setDefaultLocationButton.addEventListener('click', () => {
    updateLocalStorage(weather);
    console.log('default location set');
    setDefaultLocationButton.disabled = true;
  });
}

export function init() {
  handleInput();

  const storedWeatherData = localStorage.getItem('weather');
  if (!storedWeatherData) {
    requestLocation('Berlin');
  }
  if (storedWeatherData) {
    requestLocation(JSON.parse(storedWeatherData));
  }
}
