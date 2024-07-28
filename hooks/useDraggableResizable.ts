import { useState, useCallback, useEffect } from "react";

export const useDraggableResizable = (
  initialPosition: { x: number; y: number },
  initialSize: { width: number; height: number },
) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    event.preventDefault();
    if ((event.target as HTMLElement).classList.contains("drag-handle")) {
      setIsDragging(true);
    } else if (
      (event.target as HTMLElement).classList.contains("resize-handle")
    ) {
      setIsResizing(true);
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging) {
        setPosition((prev) => ({
          x: prev.x + event.movementX,
          y: prev.y + event.movementY,
        }));
      } else if (isResizing) {
        setSize((prev) => ({
          width: prev.width + event.movementX,
          height: prev.height + event.movementY,
        }));
      }
    },
    [isDragging, isResizing],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return { position, size, handleMouseDown };
};
