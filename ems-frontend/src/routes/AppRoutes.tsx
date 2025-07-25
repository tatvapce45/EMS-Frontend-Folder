import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import OTPVerification from '../features/auth/components/OTPVerification';
import { useLocation, Navigate } from 'react-router-dom';

const AppRoutes: React.FC = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/verify',
      element: <OTPWrapper />,
    },
  ]);

  return routes;
};

export default AppRoutes;

// ✅ Wrapper to inject route state as props
const OTPWrapper = () => {
  const location = useLocation();
  const userEmail = location.state?.userEmail;

  if (!userEmail) return <Navigate to="/" replace />;

  return (
    <OTPVerification
      userEmail={userEmail}
      onBack={() => window.history.back()}
      onVerifySuccess={() => console.log('OTP verified')}
    />
  );
};
