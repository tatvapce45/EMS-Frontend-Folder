import React from 'react';
import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';
import SocialButton from '../../../components/common/SocialButton';

const LoginCard: React.FC = () => {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 transform hover:scale-[1.02] transition-all duration-300">
        
        {/* Header */}
        <LoginHeader />

        {/* Form */}
        <LoginForm />

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-4 text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 rounded-full">
            Or continue with
          </span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <SocialButton provider="google" />
          <SocialButton provider="facebook" />
        </div>

        {/* Sign Up */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Don't have an account?{' '}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          © 2025 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginCard;
