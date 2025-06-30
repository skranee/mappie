import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from '@/components/PrivateRoute';
import { ROUTES } from '@/constants/Routes.tsx';

import '@/assets/styles/global.css';

export const App = () => {
  return (
    <Routes>
      {ROUTES.map(route => {
        const element = route.private ? <PrivateRoute>{route.page}</PrivateRoute> : route.page;

        return <Route key={route.path} path={route.path} element={element} />;
      })}
    </Routes>
  );
};
