const GEOCODE_API_KEY = import.meta.env.VITE_GEOCODE_API_KEY as string;

async function getLocation(location: string) {
  try {
    const response = await fetch(
      `https://geocode.maps.co/search?q=${location}&api_key=${GEOCODE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: unknown = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to get the location!', error);
  } finally {
    console.log('Location fetched!');
  }
}

export { getLocation };
