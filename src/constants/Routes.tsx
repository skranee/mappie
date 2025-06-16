import { Map } from '@/pages/Map.tsx';
import { Auth } from '@/pages/Auth.tsx';

export const ROUTES = [
  { path: '/', page: <Map /> },
  { path: '/auth', page: <Auth /> },
];
