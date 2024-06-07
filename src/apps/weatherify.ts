import '../style.css';
import getWeather from '../api/weatherify/getWeather';
import getLocation from '../api/weatherify/getLocation';
import generateWeatherCard from '../helpers/weatherify/markup/generateWeatherCardMarkup';
import generateForecastCard from '../helpers/weatherify/markup/generateForecastCardMarkup';
import generateButton from '../helpers/weatherify/markup/generateButtonMarkup';
import {
  CurrentWeatherResponse,
  ForecastResponse,
  CurrentWeatherData,
  Location,
} from '../lib/types';

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
    const response = await getWeather<CurrentWeatherResponse>(url);
    const weather: CurrentWeatherData = {
      description: response.weather[0].description,
      icon: response.weather[0].icon,
      temp: response.main.temp,
      name: display_name,
    };
    generateWeatherCard(weather);
    toggleButtonVisibility(weather);
    handleSetDefaultLocationClick(weather);
    requestForecastCurrentDay(location);
  } catch (error) {
    console.error('Try again!', error);
  }
}

// ! Work in progress !!!!!!!!!

async function requestForecastCurrentDay(location: Location) {
  const { lat, lon } = location;
  const url: string = `https://api.openweathermap.org/data/2.5/forecast?lat=${Number(
    lat
  )}&lon=${Number(lon)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=de`;
  try {
    const response = await getWeather<ForecastResponse>(url);
    console.log(response);

    // create a new object with the data grouped by day
    const groupedByDay = response.list.reduce(
      (acc: Record<string, typeof response.list>, curr) => {
        const date = curr.dt_txt.split(' ')[0];

        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push(curr);

        return acc;
      },
      {}
    );
    const currentDate = new Date().toISOString().split('T')[0];
    const weatherToday = groupedByDay[currentDate];

    if (weatherToday) {
      console.log(weatherToday);
      generateForecastCard(weatherToday);
    } else {
      console.log('Keine Wetterdaten für das aktuelle Datum gefunden');
    }
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
  const test = document.querySelector<HTMLButtonElement>('#weather-card');
  let setDefaultLocationButton = document.querySelector<HTMLButtonElement>(
    '#default-location-button'
  );

  const location = weatherData.name;
  const storedWeatherData = localStorage.getItem('weather');
  const storedLocation: string | null = storedWeatherData
    ? JSON.parse(storedWeatherData)
    : null;

  if (!setDefaultLocationButton) {
    setDefaultLocationButton = generateButton(
      'Set as default location',
      'default-location-button'
    );
  }

  if (storedLocation && location === storedLocation) return;

  if (test && !test.contains(setDefaultLocationButton)) {
    test.appendChild(setDefaultLocationButton);
  }
}

function handleSetDefaultLocationClick(weather: CurrentWeatherData) {
  const main = document.querySelector('main');
  if (!main) return;

  main.addEventListener('click', (event) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.id === 'default-location-button'
    ) {
      let setDefaultLocationButton = event.target as HTMLButtonElement;
      setDefaultLocationButton.disabled = false;

      updateLocalStorage(weather);
      console.log('default location set');
      setDefaultLocationButton.disabled = true;
    }
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
// Feature: add forecast fore the current day. Use open weather api and create api request and pick the weather for the current day out of it.

// todo: display it in a card if button to display is clicked
// step3: create a function to generate the markup for the forecast cart
