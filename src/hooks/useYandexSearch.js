import { useState, useEffect } from 'react';

export const useYandexSearch = () => {
  const [ymaps, setYmaps] = useState(null);

  useEffect(() => {
    if (window.ymaps) {
      window.ymaps.ready(() => {
        setYmaps(window.ymaps);
      });
    }
  }, []);

  const searchLocation = async (query) => {
    if (!ymaps) return null;

    try {
      const result = await ymaps.geocode(query);
      const firstResult = result.geoObjects.get(0);
      
      if (firstResult) {
        const coords = firstResult.geometry.getCoordinates();
        return { lat: coords[0], lng: coords[1] };
      }
    } catch (error) {
      console.error('Search error:', error);
    }
    return null;
  };

  return { searchLocation, isLoaded: !!ymaps };
};