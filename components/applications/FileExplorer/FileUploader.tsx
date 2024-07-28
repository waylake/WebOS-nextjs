import React from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onUpload: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const onDrop = (acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-4 mb-4 ${
        isDragActive ? "border-blue-500" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-center text-gray-500 dark:text-gray-400">
        {isDragActive
          ? "Drop the files here"
          : "Drag &apos;n&apos; drop some files here, or click to select files"}
      </p>
    </div>
  );
};

export default FileUploader;
