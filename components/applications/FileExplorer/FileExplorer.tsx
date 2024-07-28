import React, { useState, useEffect } from "react";
import { FileSystemItem } from "./FileSystemItem";
import { FilePreview } from "./FilePreview";
import FileUploader from "./FileUploader";
import {
  useFileSystem,
  FileSystemItem as FileSystemItemType,
  FileSystem,
  addFile,
} from "../../../lib/fileSystem";

export const FileExplorer: React.FC = () => {
  const { fileSystem, updateFileSystem } = useFileSystem();
  const [selectedFile, setSelectedFile] = useState<FileSystemItemType | null>(
    null,
  );
  const [openFolders, setOpenFolders] = useState<Set<string>>(
    new Set(["root"]),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(fileSystem).length > 0) {
      setIsLoading(false);
    }
  }, [fileSystem]);

  const handleFileSelect = (file: FileSystemItemType) => {
    setSelectedFile(file);
  };

  const handleFolderToggle = (id: string) => {
    setOpenFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleFileUpload = async (newFiles: File[]) => {
    const updatedFileSystem = { ...fileSystem };
    for (const file of newFiles) {
      const newFileItem = await addFile(file);
      updatedFileSystem[newFileItem.id] = newFileItem;
      if (updatedFileSystem.root && updatedFileSystem.root.children) {
        updatedFileSystem.root.children.push(newFileItem.id);
      } else if (updatedFileSystem.root) {
        updatedFileSystem.root.children = [newFileItem.id];
      }
    }
    updateFileSystem(updatedFileSystem);
  };

  const renderFileSystemItem = (
    item: FileSystemItemType,
    fileSystem: FileSystem,
  ) => {
    if (!item) return null;
    return (
      <FileSystemItem
        key={item.id}
        item={item}
        fileSystem={fileSystem}
        onSelect={handleFileSelect}
        onFolderToggle={handleFolderToggle}
        isOpen={openFolders.has(item.id)}
      >
        {item.type === "directory" &&
          item.children?.map((childId: string) =>
            fileSystem[childId]
              ? renderFileSystemItem(fileSystem[childId], fileSystem)
              : null,
          )}
      </FileSystemItem>
    );
  };

  if (isLoading) {
    return <div>Loading file system...</div>;
  }

  if (!fileSystem.root) {
    return <div>Error: File system root not found.</div>;
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        File Explorer
      </h2>
      <FileUploader onUpload={handleFileUpload} />
      <div className="mt-4 overflow-auto max-h-96">
        {renderFileSystemItem(fileSystem.root, fileSystem)}
      </div>
      {selectedFile && (
        <FilePreview
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
};
