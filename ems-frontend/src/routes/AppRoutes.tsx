import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from '../features/auth/pages/Login';

const AppRoutes: React.FC = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Login />,
    }
  ]);

  return routes;
};

export default AppRoutes;
