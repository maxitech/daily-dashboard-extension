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
    // const locationName = locationData[0].display_name;
    const { lat, lon, display_name } = locationData[0];
    requestWeather({ lat, lon, display_name });
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
    console.log(weather);
  } catch (error) {
    console.error('Try again!', error);
  }
}

function checkLocalStorageAndGenerateWeatherCard() {
  const weatherData = localStorage.getItem('weather');
  if (!weatherData) return;

  const parsedWeatherData: WeatherData = JSON.parse(weatherData);
  generateWeatherCard(parsedWeatherData);
}

checkLocalStorageAndGenerateWeatherCard();

// want a button to set a default location that should be remembered
// button click should set the current location as default location in local storage
// -- if no location is given option should not be available(button not visible as long as no location is given)
// -- if location is given option should be available

// step 1: create a button

// step 2: make the button visible only if a location is given
function toggleButtonVisibility(weatherData: WeatherData) {
  if (!weatherData) return;
  const app = document.querySelector<HTMLDivElement>('#app');

  const weatherDataAsString = JSON.stringify(weatherData);
  const storedWeatherData = localStorage.getItem('weather');

  const button = generateButton();

  if (weatherDataAsString === storedWeatherData) return;

  if (app && !app.contains(button)) {
    app.appendChild(button);
  }
}

// step 3: add a click event listener to the button
// step 4: set the current location as the default location in local storage
