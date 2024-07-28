import React from "react";
import {
  FileSystemItem as FileSystemItemType,
  FileSystem,
} from "../../../lib/fileSystem";
import { ChevronRight, ChevronDown, FileText, Folder } from "lucide-react";

interface FileSystemItemProps {
  item: FileSystemItemType;
  fileSystem: FileSystem;
  onSelect: (item: FileSystemItemType) => void;
  onFolderToggle: (id: string) => void;
  isOpen: boolean;
  children: React.ReactNode;
}

export const FileSystemItem: React.FC<FileSystemItemProps> = ({
  item,
  fileSystem,
  onSelect,
  onFolderToggle,
  isOpen,
  children,
}) => {
  return (
    <div className="pl-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={() =>
          item.type === "directory" ? onFolderToggle(item.id) : onSelect(item)
        }
      >
        {item.type === "directory" ? (
          isOpen ? (
            <ChevronDown size={16} className="mr-1" />
          ) : (
            <ChevronRight size={16} className="mr-1" />
          )
        ) : (
          <FileText size={16} className="mr-1" />
        )}
        <span>{item.name}</span>
      </div>
      {isOpen && <div className="pl-4">{children}</div>}
    </div>
  );
};

export default FileSystemItem;
