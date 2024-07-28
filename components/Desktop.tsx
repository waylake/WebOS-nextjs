"use client";

import React, { useState, useEffect } from "react";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import DraggableWindow from "./DraggableWindow";
import { getFileHandle, readFileContent } from "@/lib/fileSystem";

type Window = {
  id: number;
  title: string;
  component: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

const Desktop: React.FC = () => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [nextId, setNextId] = useState(1);
  const [wallpaper, setWallpaper] = useState<string>("");

  useEffect(() => {
    const loadWallpaper = async () => {
      const handle = await getFileHandle("wallpaper");
      if (handle) {
        const content = await readFileContent(handle);
        setWallpaper(content);
      }
    };
    loadWallpaper();
  }, []);

  const openWindow = (title: string, component: React.ReactNode) => {
    setWindows((prev) => [
      ...prev,
      {
        id: nextId,
        title,
        component,
        position: { x: 50 + nextId * 30, y: 50 + nextId * 30 },
        size: { width: 600, height: 400 },
      },
    ]);
    setNextId((prev) => prev + 1);
  };

  const closeWindow = (id: number) => {
    setWindows((prev) => prev.filter((window) => window.id !== id));
  };

  return (
    <div className="h-screen flex flex-col">
      <MenuBar />
      <div
        className="flex-1 relative overflow-hidden"
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {windows.map((window) => (
          <DraggableWindow
            key={window.id}
            window={window}
            closeWindow={closeWindow}
            bringToFront={() => {
              setWindows((prev) => [
                ...prev.filter((w) => w.id !== window.id),
                window,
              ]);
            }}
          />
        ))}
      </div>
      <Dock openWindow={openWindow} />
    </div>
  );
};

export default Desktop;
