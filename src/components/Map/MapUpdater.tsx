import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

import { useAppSelector } from '@/hooks/useAppSelector';

export const MapUpdater = () => {
  const map = useMap();
  const { location } = useAppSelector(state => state.map);

  useEffect(() => {
    if (location) {
      map.flyTo(location, map.getZoom(), { duration: 1.5 });
    }
  }, [location, map]);

  return null;
};
