import { Location } from '../../lib/types';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

export default async function getLocation(location: string) {
  try {
    const response = await fetch(
      ` http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${OPENWEATHER_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    const data: Location[] = await response.json();
    if (data.length === 0) {
      throw new Error('The location you requested was not found!');
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch the location!', error);
    throw error;
  } finally {
    console.log('Location fetch completed!');
  }
}
