import { fetchWeatherApi } from 'openmeteo';

async function getWeather(lat: number, lon: number) {
  const params = {
    latitude: lat,
    longitude: lon,
    current: ['temperature_2m', 'weather_code'],
  };
  const url = 'https://api.open-meteo.com/v1/dwd-icon';
  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      weatherCode: current.variables(1)!.value(),
    },
  };

  return weatherData;
}

// Helper function to form time ranges
// const range = (start: number, stop: number, step: number) =>
//   Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// // Process first location. Add a for-loop for multiple locations or weather models
// const response = responses[0];

// // Attributes for timezone and location
// const utcOffsetSeconds = response.utcOffsetSeconds();
// const timezone = response.timezone();
// const timezoneAbbreviation = response.timezoneAbbreviation();
// const latitude = response.latitude();
// const longitude = response.longitude();

// const current = response.current()!;

// // `weatherData` now contains a simple structure with arrays for datetime and weather data

export { getWeather };
