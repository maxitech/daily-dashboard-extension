import { ForecastData } from '../../../lib/types';

const pageContent = document.querySelector<HTMLDivElement>(
  '#forecast-container'
);
const forecastCard = document.createElement('section');
forecastCard.id = 'forecast-card';
forecastCard.classList.add('flex', 'flex-wrap', 'gap-4');

export default function generateForecastCard(forecast: ForecastData[]) {
  forecastCard.innerHTML = '';

  forecast.forEach((weatherData) => {
    // Create an image element
    const img = document.createElement('img');
    img.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    img.alt = 'Weather Icon';

    // Create a paragraph element to display the time
    const time = document.createElement('p');
    const date = new Date(weatherData.dt * 1000);
    time.textContent = `${new Intl.DateTimeFormat('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    }).format(date)}`;

    // Create a paragraph element to display the temperature
    const temp = document.createElement('p');
    temp.textContent = `${Math.trunc(weatherData.main.temp)}°`;

    // Create a paragraph element to display the description
    const description = document.createElement('p');
    description.textContent = `${weatherData.weather[0].description}`;

    const container = document.createElement('div');

    forecastCard.appendChild(container);
    container.appendChild(img);
    container.appendChild(time);
    container.appendChild(temp);
    container.appendChild(description);

    if (pageContent && !pageContent.contains(forecastCard)) {
      pageContent.appendChild(forecastCard);
    }
  });
}
