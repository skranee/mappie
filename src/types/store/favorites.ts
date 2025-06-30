import type { Landmark } from '@/types/landmark.ts';

export interface FavoritesSlice {
  email: string;
  favorites: Landmark[];
}
