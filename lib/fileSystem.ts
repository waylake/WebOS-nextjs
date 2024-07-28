import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

export type FileSystemItem = {
  id: string;
  name: string;
  type: "file" | "directory";
  content?: string; // Base64 or Data URL
  children?: string[]; // Store only IDs of children
};

export type FileSystem = { [id: string]: FileSystemItem };

const initialFileSystem: FileSystem = {
  root: {
    id: "root",
    name: "Root",
    type: "directory",
    children: ["documents", "pictures"],
  },
  documents: {
    id: "root/documents",
    name: "Documents",
    type: "directory",
    children: [],
  },
  pictures: {
    id: "root/pictures",
    name: "Pictures",
    type: "directory",
    children: [],
  },
};

export const getFileSystem = async (): Promise<FileSystem> => {
  const savedFileSystem = localStorage.getItem("fileSystem");
  if (savedFileSystem) {
    return JSON.parse(savedFileSystem);
  } else {
    return initialFileSystem;
  }
};

export const saveFileSystem = async (fileSystem: FileSystem) => {
  localStorage.setItem("fileSystem", JSON.stringify(fileSystem));
};

export const addFile = async (file: File): Promise<FileSystemItem> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const newFile: FileSystemItem = {
        id: uuidv4(),
        name: file.name,
        type: "file",
        content,
      };
      const currentFileSystem = await getFileSystem();
      currentFileSystem[newFile.id] = newFile;

      if (currentFileSystem.root.children) {
        currentFileSystem.root.children.push(newFile.id);
      } else {
        currentFileSystem.root.children = [newFile.id];
      }

      await saveFileSystem(currentFileSystem);
      resolve(newFile);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const useFileSystem = () => {
  const [fileSystem, setFileSystem] = useState<FileSystem>({});

  useEffect(() => {
    getFileSystem().then(setFileSystem);
  }, []);

  const updateFileSystem = async (newFileSystem: FileSystem) => {
    setFileSystem(newFileSystem);
    await saveFileSystem(newFileSystem);
  };

  return { fileSystem, updateFileSystem };
};

export const getFileHandle = async (
  fileName: string,
): Promise<FileSystemItem | null> => {
  const fileSystem = await getFileSystem();
  return fileSystem[fileName] || null;
};

export const readFileContent = async (
  fileHandle: FileSystemItem,
): Promise<string> => {
  return fileHandle.content || "";
};

export const saveFileHandle = async (
  fileHandle: FileSystemItem,
): Promise<void> => {
  const currentFileSystem = await getFileSystem();
  currentFileSystem[fileHandle.id] = fileHandle;
  await saveFileSystem(currentFileSystem);
};
