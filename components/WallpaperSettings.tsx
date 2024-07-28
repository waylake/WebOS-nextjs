import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getItem } from "@/lib/indexedDB";

interface WallpaperSettingsProps {
  updateWallpaper: (wallpaper: string) => void;
}

const WallpaperSettings: React.FC<WallpaperSettingsProps> = ({
  updateWallpaper,
}) => {
  const [wallpaper, setWallpaper] = useState<string>("");

  useEffect(() => {
    getItem<{ value: string }>("settings", "wallpaper").then(
      (savedWallpaper) => {
        if (savedWallpaper && savedWallpaper.value) {
          setWallpaper(savedWallpaper.value);
        }
      },
    );
  }, []);

  const handleWallpaperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWallpaper(e.target.value);
  };

  const saveWallpaper = () => {
    updateWallpaper(wallpaper);
    alert("Wallpaper saved successfully!");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Wallpaper Settings</h2>
      <Input
        type="text"
        placeholder="Enter wallpaper URL"
        value={wallpaper}
        onChange={handleWallpaperChange}
        className="mb-4"
      />
      <Button onClick={saveWallpaper}>Save Wallpaper</Button>
    </div>
  );
};

export default WallpaperSettings;
