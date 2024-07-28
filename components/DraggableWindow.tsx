import React from "react";
import { useDraggableResizable } from "@/hooks/useDraggableResizable";

interface Window {
  id: number;
  title: string;
  component: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface DraggableWindowProps {
  window: Window;
  closeWindow: (id: number) => void;
  bringToFront: () => void;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({
  window,
  closeWindow,
  bringToFront,
}) => {
  const { position, size, handleMouseDown } = useDraggableResizable(
    window.position,
    window.size,
  );

  return (
    <div
      className="absolute bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden"
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
      onClick={bringToFront}
    >
      <div
        className="bg-gray-200 dark:bg-gray-700 p-2 flex justify-between items-center drag-handle cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(window.id);
            }}
          />
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600" />
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600" />
        </div>
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {window.title}
        </span>
        <div className="w-5" />
      </div>
      <div className="p-4 h-[calc(100%-2.5rem)] overflow-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
        {window.component}
      </div>
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize resize-handle"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default DraggableWindow;
