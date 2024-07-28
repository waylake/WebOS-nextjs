import React from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onUpload: (files: File[]) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const onDrop = (acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-4 rounded-lg cursor-pointer ${
        isDragActive ? "border-blue-500" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-center">Drop the files here...</p>
      ) : (
        <p className="text-center">
          Drag 'n' drop some files here, or click to select files
        </p>
      )}
    </div>
  );
};

export default FileUploader;
