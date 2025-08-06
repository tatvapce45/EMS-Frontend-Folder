import React, { useState } from "react";
import InputField from "../../../components/common/InputField";
import PasswordField from "../../../components/common/PasswordField";
import { getEmailError, getPasswordError } from "../../../utils/validation";
import { login } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onSuccess?: (data: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    if (name === "email" && typeof updatedValue === "string") {
      const emailError = getEmailError(updatedValue);
      setErrors((prev) => ({ ...prev, email: emailError ?? "" }));
    }

    if (name === "password" && typeof updatedValue === "string") {
      const passwordError = getPasswordError(updatedValue);
      setErrors((prev) => ({ ...prev, password: passwordError ?? "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = getEmailError(formData.email);
    const passwordError = getPasswordError(formData.password);

    setErrors({
      email: emailError ?? "",
      password: passwordError ?? "",
    });

    const isValid = !emailError && !passwordError;

    if (!isValid) return;

    // try {
    //   const result = await login(formData.email, formData.password);
    //   console.log("Login success:", result);

    //   if (result.success) {
    //     sessionStorage.setItem("userEmail", formData.email);
    //     sessionStorage.setItem("loginVerified", "true");

    //     navigate("/verify", {
    //       state: {
    //         userEmail: formData.email,
    //         loginVerified: true,
    //       },
    //     });
    //   }
    //   else
    //   {
    //     throw new Error(result.message || "Login failed");
    //   }
    // } catch (error: any) {
    //   console.error("Login failed:", error);
    //   alert(error.message || "Login failed");
    // }
    navigate("/verify", {
        state: {
          userEmail: formData.email,
          loginVerified: true,
        },
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        label="Email Address"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        placeholder="Enter your email"
      />

      <PasswordField
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        showPassword={showPassword}
        toggleShowPassword={() => setShowPassword((prev) => !prev)}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
          />
          <label
            htmlFor="rememberMe"
            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <a
          href="#"
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors"
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/25"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
