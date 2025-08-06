import React from 'react';
import ToggleThemeButton from '../../../components/common/ToggleThemeButton';
import LoginCard from '../components/LoginCard';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="absolute top-4 right-4">
        <ToggleThemeButton />
      </div>
      <LoginCard />
    </div>
  );
};
export default Login;
