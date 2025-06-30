import { useEffect, useState } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { LatLng } from 'leaflet';

import { Button } from '@/components/controls/Button/Button.tsx';
import { MapUpdater } from '@/components/Map/MapUpdater.tsx';
import { Routing } from '@/components/Map/Routing.tsx';
import { RouteDetails } from '@/components/RouteDetails/RouteDetails.tsx';
import { MARKER_ICON, ROUTE_TO_ICON, USER_MARKER_ICON } from '@/constants/Location.ts';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { useLocation } from '@/hooks/useLocation.ts';
import { addFavorite } from '@/store/slices/FavoritesSlice.ts';
import type { Landmark } from '@/types/landmark.ts';

import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

const zoom = 14;

export const Map = () => {
  useLocation();

  const dispatch = useAppDispatch();

  const { mode, isOpen } = useAppSelector(state => state.panel);
  const { location, radius, landmarks } = useAppSelector(state => state.map);
  const { favorites } = useAppSelector(state => state.favorites);
  const { from, to } = useAppSelector(state => state.route);

  const [saved, setSaved] = useState<Landmark[]>([]);

  const saveLandmark = (place: Landmark) => {
    dispatch(addFavorite(place));
  };

  useEffect(() => {
    if (mode === 'saved') {
      setSaved(favorites);
    } else {
      setSaved([]);
    }
  }, [mode]);

  return (
    <div
      className={`
        ${styles.map} 
        ${isOpen && styles['map--squeezed']} 
        ${mode === 'landmark' && isOpen && styles['map--extra-squeezed']}
      `}
    >
      {from && to && <RouteDetails />}
      <MapContainer center={location} zoom={zoom} className={styles.leafletContainer}>
        <MapUpdater />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={location} icon={USER_MARKER_ICON}>
          <Popup>Ваша локация</Popup>
        </Marker>
        {to && <Marker position={to} icon={ROUTE_TO_ICON} />}
        {saved.length &&
          saved.map((place, index) => (
            <Marker
              key={`place-${index}`}
              position={new LatLng(place.lat, place.lon)}
              icon={MARKER_ICON}
            >
              <Popup>{place.name}</Popup>
            </Marker>
          ))}
        {landmarks &&
          landmarks.map((landmark, index) => (
            <Marker
              key={`landmark-${index}`}
              position={new LatLng(landmark.lat, landmark.lon)}
              icon={MARKER_ICON}
            >
              <Popup>
                {landmark.name}
                <Button
                  version='gray-light'
                  square={false}
                  size='sm'
                  onClick={() => saveLandmark(landmark)}
                >
                  Сохранить
                </Button>
              </Popup>
            </Marker>
          ))}
        <Circle center={location} radius={radius} pathOptions={{ fillColor: 'darkblue' }} />
        {from && to && <Routing />}
      </MapContainer>
    </div>
  );
};
