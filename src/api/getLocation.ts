import { Location } from '../lib/types';

const GEOCODE_API_KEY = import.meta.env.VITE_GEOCODE_API_KEY as string;

async function getLocation(location: string) {
  try {
    const response = await fetch(
      `https://geocode.maps.co/search?q=${location}&api_key=${GEOCODE_API_KEY}`
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

export { getLocation };
