import { useEffect, useRef } from 'react';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setLocation } from '@/store/slices/MapSlice';
import { getLocation } from '@/utils/getLocation';

export const useLocation = () => {
  const dispatch = useAppDispatch();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const setUserLocation = async () => {
      try {
        const location = await getLocation();
        dispatch(setLocation(location));
      } catch (error) {
        console.error('Failed to get location:', error);
      } finally {
        timeoutRef.current = setTimeout(setUserLocation, 10000);
      }
    };

    setUserLocation();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dispatch]);
};
