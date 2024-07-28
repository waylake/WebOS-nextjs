import React from "react";
import Image from "next/image";
import { FileSystemItem } from "@/lib/fileSystem";

interface ImagePreviewProps {
  file: FileSystemItem;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image
        src={URL.createObjectURL(
          new Blob([file.content || ""], { type: "image/png" }),
        )}
        alt={file.name}
        width={800}
        height={600}
        className="max-w-full h-auto"
      />
    </div>
  );
};

export default ImagePreview;
