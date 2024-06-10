import { CurrentWeatherData } from '../../../lib/types';

const weatherContainer =
  document.querySelector<HTMLDivElement>('#weather-container');

const weatherCard = document.createElement('section');
weatherCard.id = 'weather-card';
weatherCard.classList.add('bg-blue-600', 'rounded-lg', 'p-2', 'pt-4');
export default function generateWeatherCard(weather: CurrentWeatherData) {
  // Create a div element to hold the weather info
  const infoContainer = document.createElement('div');
  infoContainer.classList.add('flex', 'items-center');

  // Create a paragraph element to display the location
  const infoDescription = document.createElement('p');
  infoDescription.textContent = `${weather.description}`;

  // Create an image element
  const img = document.createElement('img');
  img.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  img.alt = 'Weather Icon';

  // Create a paragraph element to display the temperature
  const infoTemp = document.createElement('p');
  infoTemp.textContent = `${Math.trunc(weather.temp)}°C`;
  infoTemp.classList.add('text-5xl', 'font-semibold');

  // Create a paragraph element to display the location name
  const infoLocationName = document.createElement('p');
  const nameParts = weather.name.split(',');
  let displayName =
    nameParts.length > 2 ? `${nameParts[0]}, ${nameParts[1]}` : weather.name;
  infoLocationName.textContent = displayName;
  infoLocationName.classList.add('text-xl', 'font-semibold');

  // Append the elements to the weather card
  weatherCard.innerHTML = '';

  weatherCard.appendChild(infoLocationName);
  weatherCard.appendChild(infoDescription);
  weatherCard.appendChild(infoContainer);
  infoContainer.appendChild(img);
  infoContainer.appendChild(infoTemp);

  if (weatherContainer && !weatherContainer.contains(weatherCard)) {
    weatherContainer.appendChild(weatherCard);
  }
}
