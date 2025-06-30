import L, { LatLng } from 'leaflet';

import RoutesAPI from '@/apis/routes';
import BookmarkGray from '@/assets/icons/bookmark-gray.svg';
import Mark from '@/assets/icons/mark.svg';
import { Button } from '@/components/controls/Button/Button.tsx';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { setDistance, setDuration, setFrom, setTo } from '@/store/slices/RouteSlice.ts';
import type { Landmark } from '@/types/landmark.ts';

import styles from './Details.module.css';

type Details = {
  landmark: Landmark;
};

export const Details = ({ landmark }: Details) => {
  const { location } = useAppSelector(state => state.map);

  const dispatch = useAppDispatch();

  const getRoute = async () => {
    const userLatitude = L.latLng(location).lat;
    const userLongitude = L.latLng(location).lng;

    const routeInfo = await RoutesAPI.get(userLatitude, userLongitude, landmark.lat, landmark.lon);

    dispatch(setFrom(location));
    dispatch(setTo(new LatLng(landmark.lat, landmark.lon)));

    dispatch(setDistance(routeInfo.distance));
    dispatch(setDuration(routeInfo.duration));
  };

  return (
    <div className={styles.details}>
      <img src={landmark.img} className={styles.details__image} alt='image' />
      <div className={styles.details__badges}></div>
      <span className={styles.details__title}>{landmark.name}</span>
      <span className={styles.details__description}>{landmark.description}</span>
      <div className={styles.details__buttons}>
        <Button version='white' square={false} size='sm'>
          <img src={BookmarkGray} alt='bookmark-gray' />
          <span>Сохранено</span>
        </Button>
        <Button version='blue' square={false} size='sm' onClick={getRoute}>
          <img src={Mark} alt='bookmark-gray' />
          <span>Маршрут</span>
        </Button>
      </div>
    </div>
  );
};
