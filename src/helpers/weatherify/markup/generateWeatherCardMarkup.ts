import { CurrentWeatherData } from '../../../lib/types';

const weatherContainer =
  document.querySelector<HTMLDivElement>('#weather-container');

const weatherCard = document.createElement('section');
weatherCard.id = 'weather-card';
export default function generateWeatherCard(weather: CurrentWeatherData) {
  // Create an image element
  const img = document.createElement('img');
  img.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  img.alt = 'Weather Icon';

  // Create a div element to hold the weather info
  const infoContainer = document.createElement('div');

  // Create a paragraph element to display the location
  const infoDescription = document.createElement('p');
  // infoDescription.classList.add('text-3xl');
  // infoDescription.classList.add('underline');
  infoDescription.textContent = `${weather.description}`;

  // Create a paragraph element to display the temperature
  const infoTemp = document.createElement('p');
  infoTemp.textContent = `${Math.trunc(weather.temp)}°C`;

  // Create a paragraph element to display the location name
  const infoLocationName = document.createElement('p');
  infoLocationName.textContent = `${weather.name}`;

  // Append the elements to the weather card
  weatherCard.innerHTML = '';
  weatherCard.appendChild(infoContainer);
  infoContainer.appendChild(img);
  infoContainer.appendChild(infoDescription);
  infoContainer.appendChild(infoTemp);
  infoContainer.appendChild(infoLocationName);

  if (weatherContainer && !weatherContainer.contains(weatherCard)) {
    weatherContainer.appendChild(weatherCard);
  }
}
