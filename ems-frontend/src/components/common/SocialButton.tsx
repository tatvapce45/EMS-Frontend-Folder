import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
interface SocialButtonProps {
  provider: "google" | "facebook";
  onClick?: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, onClick }) => {
  const isGoogle = provider === "google";

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group w-full"
    >
      {isGoogle ? (
        <>
          <GoogleIcon
            className="w-5 h-5 mr-2 text-gray-700 dark:text-gray-300"
            sx={{ color: "#000" }}
          />
          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
            Google
          </span>
        </>
      ) : (
        <>
          <div>
            <FacebookOutlinedIcon
              className="w-5 h-5 mr-2 text-gray-700 dark:text-gray-300"
              sx={{ color: "#000" }}
            />
          </div>
          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
            Facebook
          </span>
        </>
      )}
    </button>
  );
};

export default SocialButton;
