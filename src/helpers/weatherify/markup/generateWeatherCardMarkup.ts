import { CurrentWeatherData } from '../../../lib/types';

const weatherContainer =
  document.querySelector<HTMLDivElement>('#weather-container');

const weatherCard = document.createElement('div');
weatherCard.id = 'weather-card';
weatherCard.classList.add('bg-blue-600', 'rounded-lg', 'p-4', 'pt-6');
export default function generateWeatherCard(weather: CurrentWeatherData) {
  // Create a div element to hold the weather details
  const weatherDetailsContainer = document.createElement('div');
  weatherDetailsContainer.classList.add(
    'flex',
    'items-center',
    'justify-end',
    'flex-col',
    'p-4',
    'sm:flex-row',
    'sm:gap-6',
    'sm:items-center',
    'md:min-w-[35em]'
  );

  // Create a div element to hold the weather info
  const infoContainer = document.createElement('div');
  infoContainer.classList.add('flex', 'flex-col');

  // Create a paragraph element to display the temperature
  const infoTemp = document.createElement('p');
  infoTemp.textContent = `${Math.trunc(weather.temp)}°`;
  infoTemp.classList.add('text-6xl', 'font-semibold');

  // Create a paragraph element to display the time
  const infoTime = document.createElement('p');
  const date = new Date();
  infoTime.textContent = `Jetzt ${date.getHours()}:${date.getMinutes()} Uhr`;

  // Create a paragraph element to display the feels like temperature
  const infoFeelsLike = document.createElement('p');
  const tempDifference =
    Math.trunc(weather.feels_like) - Math.trunc(weather.temp);
  if (tempDifference > 0)
    infoFeelsLike.textContent = `fühlt sich ${Math.abs(
      tempDifference
    )}° wärmer an`;

  if (tempDifference < 0)
    infoFeelsLike.textContent = `fühlt sich ${Math.abs(
      tempDifference
    )}° kälter an`;

  // Create an image element
  const img = document.createElement('img');
  img.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  img.alt = 'Weather Icon';

  // Create a paragraph element to display the location
  const weatherDescription = document.createElement('p');
  weatherDescription.textContent = `${weather.description}`;

  // Create a paragraph element to display the location name
  const locationName = document.createElement('p');
  const nameParts = weather.name.split(',');
  let displayName = nameParts[0];
  locationName.textContent = displayName;
  locationName.classList.add('text-xl', 'font-semibold');

  const elementContainer = document.createElement('div');

  // Append the elements to the weather card
  weatherCard.innerHTML = '';

  weatherCard.appendChild(elementContainer);

  elementContainer.appendChild(locationName);
  elementContainer.appendChild(weatherDescription);
  elementContainer.appendChild(weatherDetailsContainer);

  weatherDetailsContainer.appendChild(img);
  weatherDetailsContainer.appendChild(infoContainer);

  infoContainer.appendChild(infoTime);
  infoContainer.appendChild(infoTemp);
  infoContainer.appendChild(infoFeelsLike);

  if (weatherContainer && !weatherContainer.contains(weatherCard)) {
    weatherContainer.appendChild(weatherCard);
  }
}
