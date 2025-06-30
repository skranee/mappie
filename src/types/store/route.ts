import type { LatLngExpression } from 'leaflet';

export type RouteSlice = {
  from?: LatLngExpression;
  to?: LatLngExpression;
  fromName?: string;
  toName?: string;
  distance?: number;
  duration?: number;
};
