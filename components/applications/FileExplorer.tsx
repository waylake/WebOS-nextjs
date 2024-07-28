import React, { useState, useCallback } from "react";
import {
  Folder,
  File,
  ChevronRight,
  ChevronDown,
  Edit,
  Save,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { useDropzone } from "react-dropzone";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

type FileType = "image" | "video" | "text" | "other";

type FileSystemItem = {
  id: string;
  name: string;
  type: "file" | "folder";
  fileType?: FileType;
  content?: string;
  children?: FileSystemItem[];
};

const initialFileSystem: FileSystemItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    children: [
      { id: "2", name: "resume.pdf", type: "file", fileType: "other" },
      { id: "3", name: "project.docx", type: "file", fileType: "other" },
    ],
  },
  {
    id: "4",
    name: "Images",
    type: "folder",
    children: [
      { id: "5", name: "vacation.jpg", type: "file", fileType: "image" },
      { id: "6", name: "profile.png", type: "file", fileType: "image" },
    ],
  },
  {
    id: "7",
    name: "notes.txt",
    type: "file",
    fileType: "text",
    content: "This is a sample note.",
  },
];

const FileSystemItem: React.FC<{
  item: FileSystemItem;
  level: number;
  onFileClick: (item: FileSystemItem) => void;
}> = ({ item, level, onFileClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div className="flex items-center p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
        {item.type === "folder" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </Button>
        )}
        {item.type === "folder" ? (
          <Folder size={16} className="text-blue-500 dark:text-blue-400" />
        ) : (
          <File size={16} className="text-gray-500 dark:text-gray-400" />
        )}
        <span
          className="ml-2 text-gray-800 dark:text-gray-200 cursor-pointer"
          onClick={() => item.type === "file" && onFileClick(item)}
        >
          {item.name}
        </span>
      </div>
      {item.type === "folder" &&
        isOpen &&
        item.children?.map((child) => (
          <FileSystemItem
            key={child.id}
            item={child}
            level={level + 1}
            onFileClick={onFileClick}
          />
        ))}
    </div>
  );
};

export const FileExplorer: React.FC = () => {
  const [fileSystem, setFileSystem] =
    useState<FileSystemItem[]>(initialFileSystem);
  const [selectedFile, setSelectedFile] = useState<FileSystemItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: "file" as const,
      fileType: file.type.startsWith("image/")
        ? ("image" as const)
        : file.type.startsWith("video/")
          ? ("video" as const)
          : file.type === "text/plain"
            ? ("text" as const)
            : ("other" as const),
    }));

    setFileSystem((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFileClick = (item: FileSystemItem) => {
    setSelectedFile(item);
    if (item.fileType === "text") {
      setEditContent(item.content || "");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedFile) {
      setFileSystem((prev) =>
        prev.map((item) =>
          item.id === selectedFile.id
            ? { ...item, content: editContent }
            : item,
        ),
      );
      setSelectedFile({ ...selectedFile, content: editContent });
      setIsEditing(false);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow dark:bg-gray-800" {...getRootProps()}>
      <input {...getInputProps()} />
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        File Explorer
      </h2>
      <div
        className={`border-2 border-dashed p-4 mb-4 ${
          isDragActive ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <p className="text-center text-gray-500 dark:text-gray-400">
          {isDragActive
            ? "Drop the files here"
            : "Drag 'n' drop some files here, or click to select files"}
        </p>
      </div>
      {fileSystem.map((item) => (
        <FileSystemItem
          key={item.id}
          item={item}
          level={0}
          onFileClick={handleFileClick}
        />
      ))}
      <Dialog
        open={selectedFile !== null}
        onOpenChange={() => setSelectedFile(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedFile?.name}</DialogTitle>
          </DialogHeader>
          {selectedFile?.fileType === "image" && (
            <img
              src={URL.createObjectURL(new Blob())}
              alt={selectedFile.name}
              className="max-w-full h-auto"
            />
          )}
          {selectedFile?.fileType === "video" && (
            <video
              src={URL.createObjectURL(new Blob())}
              controls
              className="max-w-full h-auto"
            />
          )}
          {selectedFile?.fileType === "text" && (
            <div>
              {isEditing ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-64 p-2 border rounded"
                />
              ) : (
                <pre className="whitespace-pre-wrap">
                  {selectedFile.content}
                </pre>
              )}
              <div className="flex justify-end mt-4">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} className="mr-2">
                      <Save size={16} className="mr-2" /> Save
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                    >
                      <X size={16} className="mr-2" /> Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleEdit}>
                    <Edit size={16} className="mr-2" /> Edit
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
