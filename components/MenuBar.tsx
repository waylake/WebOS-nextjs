import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";
import NotificationCenter from "./NotificationCenter";
import { Sun, Moon } from "lucide-react";

const MenuBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-gray-800 dark:bg-gray-900 text-white h-8 flex items-center px-4 justify-between">
      <div className="flex items-center space-x-4">
        <span className="font-bold">WebOS</span>
        <Button variant="ghost" size="sm">
          File
        </Button>
        <Button variant="ghost" size="sm">
          Edit
        </Button>
        <Button variant="ghost" size="sm">
          View
        </Button>
        <Button variant="ghost" size="sm">
          Window
        </Button>
        <Button variant="ghost" size="sm">
          Help
        </Button>
      </div>
      <div className="flex items-center space-x-4">
        <Button onClick={toggleTheme} variant="ghost" size="icon">
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </Button>
        <NotificationCenter />
        <span>{currentTime}</span>
      </div>
    </div>
  );
};

export default MenuBar;
