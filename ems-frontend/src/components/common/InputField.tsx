import React from "react";
import { Mail } from "lucide-react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className="h-5 w-5 text-white dark:text-white" />
        </div>
        <input
          type="email"
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 
            ${
              error
                ? "border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400"
                : "border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
            } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
          placeholder={placeholder || "Enter your email"}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 animate-pulse">{error}</p>
      )}
    </div>
  );
};

export default InputField;
