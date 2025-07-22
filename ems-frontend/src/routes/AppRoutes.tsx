// src/routes/AppRoutes.tsx
import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from '../features/auth/pages/Login'; // Adjust the import path as needed
// import Dashboard from '../modules/dashboard/pages/Dashboard'; // later

const AppRoutes: React.FC = () => {
    const routes = useRoutes([
      {
        path: '/',
        element: <Login />,
      },
    ]);
  
    return routes;
  };
  
  export default AppRoutes;