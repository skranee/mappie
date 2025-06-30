import type { LatLngExpression } from 'leaflet';

import type { Landmark } from '@/types/landmark.ts';

export type MapSlice = {
  radius: number;
  categories: string[];
  location: LatLngExpression;
  landmarks: Landmark[];
};
