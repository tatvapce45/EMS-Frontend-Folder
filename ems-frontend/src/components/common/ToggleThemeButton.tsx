import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ToggleThemeButton: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(
    localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:scale-105 transition"
    >
      {isDark ? (
        <Sun className="text-yellow-400" />
      ) : (
        <Moon className="text-gray-600" />
      )}
    </button>
  );
};

export default ToggleThemeButton;
