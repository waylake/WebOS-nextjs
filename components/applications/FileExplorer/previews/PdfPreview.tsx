import React from "react";
import { FileSystemItem } from "../../../../lib/fileSystem";

interface PdfPreviewProps {
  file: FileSystemItem;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ file }) => {
  return (
    <div className="flex justify-center items-center">
      <iframe
        src={file.content}
        title={file.name}
        className="w-full h-full max-w-full max-h-[75vh]"
      />
    </div>
  );
};

export default PdfPreview;
