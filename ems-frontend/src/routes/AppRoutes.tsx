import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import OTPVerification from '../features/auth/components/OTPVerification';

const AppRoutes: React.FC = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/otp',
      element: <OTPVerification />, // ✅ OTP route added here
    },
  ]);

  return routes;
};

export default AppRoutes;
