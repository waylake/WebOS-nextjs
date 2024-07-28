import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { FileSystemItem } from "../../../lib/fileSystem";
import ImagePreview from "./previews/ImagePreview";
import TextPreview from "./previews/TextPreview";
import PdfPreview from "./previews/PdfPreview";

interface FilePreviewProps {
  file: FileSystemItem;
  onClose: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onClose }) => {
  const renderPreview = () => {
    if (file.name.endsWith(".jpg") || file.name.endsWith(".png")) {
      return <ImagePreview file={file} />;
    }
    if (file.name.endsWith(".txt")) {
      return <TextPreview file={file} />;
    }
    if (file.name.endsWith(".pdf")) {
      return <PdfPreview file={file} />;
    }
    return (
      <div className="text-gray-900 dark:text-gray-100">
        No preview available for this file type.
      </div>
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-800 max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            {file.name}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">{renderPreview()}</div>
      </DialogContent>
    </Dialog>
  );
};
