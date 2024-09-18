import { CurrentWeatherData } from '../../../lib/types';
import getLocalTime from '../getLocalTime';

const weatherContainer =
  document.querySelector<HTMLDivElement>('#weather-container');

export default function generateWeatherCard(weather: CurrentWeatherData) {
  const tempDifference =
    Math.trunc(weather.feels_like) - Math.trunc(weather.temp);

  let infoFeelsLike;
  if (tempDifference > 0)
    infoFeelsLike = `fühlt sich ${Math.abs(tempDifference)}° wärmer an`;
  else if (tempDifference < 0)
    infoFeelsLike = `fühlt sich ${Math.abs(tempDifference)}° kälter an`;
  else infoFeelsLike = ``;

  const displayName = weather.local_names?.de
    ? weather.local_names?.de
    : weather.name;

  const markup = `
           <div
                    id="weather-card"
                    class="bg-gradient-to-r from-blue-600 to-gray-200/80 rounded-2xl lg:max-w-[50%]"
                  >
                    <div
                      class="flex justify-between p-3 md:px-5 lg:px-8 lg:py-6"
                    >
                      <div class="">
                        <p
                          class="font-semibold text-xl text-white/85 text-shadow-md md:text-3xl lg:text-4xl"
                        >
                          ${displayName}
                        </p>
                        <div class="flex items-center">
                          <span
                            class="text-white font-semibold text-sm md:text-[1rem] md:mt-1 lg:text-xl lg:mt-2"
                            > ${getLocalTime(weather.dt, weather.timezone)}
                          </span>
                        </div>
                        <p
                          class="font-semibold text-sm mt-8 md:text-[1rem] md:mt-10 lg:text-xl lg:mt-12"
                        >
                          Bedeckt
                        </p>
                      </div>
                      <div class="flex flex-col justify-between">
                        <div class="flex flex-col">
                          <div class="flex items-center justify-end">
                            <img
                              src="https://openweathermap.org/img/wn/${
                                weather.icon
                              }.png"
                              alt="Weather Icon"
                              class="md:w-16 lg:w-20"
                            />
                            <p
                              class="text-6xl text-white/85 text-shadow-sm md:text-7xl lg:text-8xl"
                            >
                              ${Math.trunc(weather.temp)}°
                            </p>
                          </div>
                        </div>
                        <p
                          class="font-semibold text-sm md:text-[1rem] lg:text-xl"
                        >
                          ${infoFeelsLike}
                        </p>
                      </div>
                    </div>
                  </div>
  `;

  if (weatherContainer) weatherContainer.innerHTML = markup;
  else console.error('Weather container not found');
}
