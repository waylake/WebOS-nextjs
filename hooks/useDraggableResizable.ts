import { useState, useCallback } from "react";

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

export const useDraggableResizable = (
  initialPos: Position,
  initialSize: Size,
) => {
  const [position, setPosition] = useState<Position>(initialPos);
  const [size, setSize] = useState<Size>(initialSize);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = size.width;
      const startHeight = size.height;
      const startPosX = position.x;
      const startPosY = position.y;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if ((event.target as HTMLElement).classList.contains("drag-handle")) {
          setPosition({
            x: startPosX + moveEvent.clientX - startX,
            y: startPosY + moveEvent.clientY - startY,
          });
        } else if (
          (event.target as HTMLElement).classList.contains("resize-handle")
        ) {
          setSize({
            width: startWidth + moveEvent.clientX - startX,
            height: startHeight + moveEvent.clientY - startY,
          });
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [position, size],
  );

  return { position, size, handleMouseDown };
};
