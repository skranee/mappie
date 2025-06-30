import { useEffect, useState } from 'react';

import L from 'leaflet';

import RoutesAPI from '@/apis/routes';
import { Button } from '@/components/controls/Button/Button.tsx';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { reset } from '@/store/slices/RouteSlice.ts';
import { convertToKm, convertToMinutes } from '@/utils/convertMetrics.ts';

import styles from './RouteDetails.module.css';

export const RouteDetails = () => {
  const { location } = useAppSelector(state => state.map);
  const { distance, duration } = useAppSelector(state => state.route);
  const { to } = useAppSelector(state => state.route);

  const [distanceLeft, setDistanceLeft] = useState(distance || 0);
  const [timeLeft, setTimeLeft] = useState(duration);

  const dispatch = useAppDispatch();

  const finishRoute = () => {
    dispatch(reset());
  };

  useEffect(() => {
    const interval = setTimeout(async () => {
      const userLatitude = L.latLng(location).lat;
      const userLongitude = L.latLng(location).lng;

      if (to) {
        const routeInfo = await RoutesAPI.get(
          userLatitude,
          userLongitude,
          L.latLng(to).lat,
          L.latLng(to).lng
        );

        setDistanceLeft(routeInfo.distance);
        setTimeLeft(routeInfo.duration);
      }
    }, 5000);

    return () => {
      clearTimeout(interval);
    };
  }, [location, to]);

  return (
    <div className={styles.routeDetails}>
      <progress
        className={styles.routeDetails__progress}
        value={((distance || distanceLeft) - distanceLeft) / (distance || 1)}
      />
      <div className={styles.routeDetails__details}>
        <div className={styles.routeDetails__detail}>
          <span className={styles.routeDetails__metrics}>{convertToKm(distanceLeft)} км</span>
          <span className={styles.routeDetails__text}>дистанция</span>
        </div>
        <div className={styles.routeDetails__detail}>
          <span className={styles.routeDetails__metrics}>{convertToMinutes(timeLeft)} мин</span>
          <span className={styles.routeDetails__text}>примерное время</span>
        </div>
      </div>
      <Button version='red' square={false} size='md' wide onClick={finishRoute}>
        Завершить
      </Button>
    </div>
  );
};
