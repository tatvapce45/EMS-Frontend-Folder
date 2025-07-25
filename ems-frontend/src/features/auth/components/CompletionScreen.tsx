import React from "react";
import { CheckCircle } from "lucide-react";

const CompletionScreen: React.FC = () => {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 text-center">
        <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-pulse">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Verification Complete!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Both email and SMS verification successful
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
            Email verified
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
            SMS verified
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;