"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface WallpaperSettingsProps {
  updateWallpaper: (wallpaper: string) => void;
}

const WallpaperSettings: React.FC<WallpaperSettingsProps> = ({
  updateWallpaper,
}) => {
  const [wallpaper, setWallpaper] = useState<string>("");

  useEffect(() => {
    const savedWallpaper = localStorage.getItem("wallpaper");
    if (savedWallpaper) {
      setWallpaper(savedWallpaper);
    }
  }, []);

  const handleWallpaperChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newWallpaper = event.target.value;
    setWallpaper(newWallpaper);
    localStorage.setItem("wallpaper", newWallpaper);
    updateWallpaper(newWallpaper);
  };

  return (
    <div className="wallpaper-settings">
      <Input
        type="text"
        value={wallpaper}
        onChange={handleWallpaperChange}
        placeholder="Enter wallpaper URL"
      />
      <Button onClick={() => updateWallpaper(wallpaper)}>
        Update Wallpaper
      </Button>
    </div>
  );
};

export default WallpaperSettings;
