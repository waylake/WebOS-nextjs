import React from "react";
import { FileSystemItem } from "../../../../lib/fileSystem";

interface ImagePreviewProps {
  file: FileSystemItem;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => {
  return (
    <div className="flex justify-center items-center">
      <img
        src={file.content}
        alt={file.name}
        className="max-w-full max-h-[75vh] object-contain"
      />
    </div>
  );
};

export default ImagePreview;
