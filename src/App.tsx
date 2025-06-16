import '@/assets/styles/global.css';
import { ROUTES } from '@/constants/Routes.tsx';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Routes>
        {ROUTES.map(route => (
          <Route key={route.path} path={route.path} element={route.page} />
        ))}
      </Routes>
    </>
  );
};
