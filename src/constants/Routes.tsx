import { Auth } from '@/pages/Auth';
import { Main } from '@/pages/Main';

export const ROUTES = [
  { path: '/', page: <Main />, private: true },
  { path: '/auth', page: <Auth />, private: false },
];
