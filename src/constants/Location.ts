import { Icon, LatLng, type LatLngExpression } from 'leaflet';

import MarkerIcon from '@/assets/icons/marker.png';
import RouteToIcon from '@/assets/icons/marker_to_route.svg';
import UserMarkerIcon from '@/assets/icons/marker_user.svg';

export const DEFAULT_LOCATION: LatLngExpression = new LatLng(
  import.meta.env.VITE_DEFAULT_LATITUDE,
  import.meta.env.VITE_DEFAULT_LONGITUDE
);

export const MARKER_ICON = new Icon({
  iconUrl: MarkerIcon,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

export const USER_MARKER_ICON = new Icon({
  iconUrl: UserMarkerIcon,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

export const ROUTE_TO_ICON = new Icon({
  iconUrl: RouteToIcon,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});
