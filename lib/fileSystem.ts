export type FileSystemItem = {
  name: string;
  type: "file" | "directory";
  content?: string;
  children?: FileSystemItem[];
};

export type FileSystem = FileSystemItem[];

const initialFileSystem: FileSystem = [
  {
    name: "Documents",
    type: "directory",
    children: [
      { name: "resume.txt", type: "file", content: "My professional resume" },
      { name: "project.txt", type: "file", content: "Project ideas" },
    ],
  },
  {
    name: "Pictures",
    type: "directory",
    children: [
      { name: "vacation.jpg", type: "file", content: "Binary content" },
      { name: "profile.png", type: "file", content: "Binary content" },
    ],
  },
  { name: "notes.txt", type: "file", content: "Important notes" },
];

export const getFileSystem = (): FileSystem => {
  // In a real application, you might load this from localStorage or an API
  return initialFileSystem;
};

export const saveFileSystem = (fileSystem: FileSystem) => {
  // In a real application, you might save this to localStorage or an API
  console.log("Saving file system:", fileSystem);
};

export const createFile = (
  path: string[],
  name: string,
  content: string = "",
) => {
  const fileSystem = getFileSystem();
  let currentDir = fileSystem;

  for (const dir of path) {
    const nextDir = currentDir.find(
      (item) => item.type === "directory" && item.name === dir,
    );
    if (nextDir && nextDir.type === "directory") {
      currentDir = nextDir.children || [];
    } else {
      throw new Error(`Directory not found: ${dir}`);
    }
  }

  currentDir.push({ name, type: "file", content });
  saveFileSystem(fileSystem);
};

export const readFile = (path: string[]): string => {
  const fileSystem = getFileSystem();
  let current: FileSystemItem | undefined = {
    type: "directory",
    name: "root",
    children: fileSystem,
  };

  for (const name of path) {
    if (current.type === "directory") {
      current = current.children?.find((item) => item.name === name);
    } else {
      throw new Error(`${current.name} is not a directory`);
    }
    if (!current) {
      throw new Error(`Item not found: ${name}`);
    }
  }

  if (current.type === "file") {
    return current.content || "";
  } else {
    throw new Error(`${current.name} is not a file`);
  }
};

// Add more functions as needed for your file system operations
