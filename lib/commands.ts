import { getFileSystem, saveFileSystem } from "./fileSystem";

export type CommandHandler = (
  args: string[],
  output: string[],
  setOutput: React.Dispatch<React.SetStateAction<string[]>>,
  currentDir?: string,
  setCurrentDir?: React.Dispatch<React.SetStateAction<string>>,
) => void | Promise<void>;

export const help: CommandHandler = (args, output, setOutput) => {
  setOutput((prev) => [
    ...prev,
    "Available commands: help, echo, clear, date, ls, mkdir, rmdir, touch, rm, cd",
  ]);
};

export const clear: CommandHandler = (args, output, setOutput) => {
  setOutput([]);
};

export const echo: CommandHandler = (args, output, setOutput) => {
  setOutput((prev) => [...prev, args.join(" ")]);
};

export const date: CommandHandler = (args, output, setOutput) => {
  setOutput((prev) => [...prev, new Date().toString()]);
};

export const ls: CommandHandler = async (
  args,
  output,
  setOutput,
  currentDir,
) => {
  const fileSystem = await getFileSystem();
  const items =
    Object.values(fileSystem)
      .filter((item) => item.type === "directory" && item.id === currentDir)[0]
      .children?.map((id) => fileSystem[id].name)
      .join("\n") || "Empty directory";
  setOutput((prev) => [...prev, items]);
};

export const mkdir: CommandHandler = async (
  args,
  output,
  setOutput,
  currentDir,
) => {
  if (args.length !== 1) {
    setOutput((prev) => [...prev, "Usage: mkdir <directory-name>"]);
    return;
  }
  const fileSystem = await getFileSystem();
  const newDirName = args[0];
  const newDirId = `${currentDir}/${newDirName}`;
  if (fileSystem[newDirId]) {
    setOutput((prev) => [...prev, `Directory already exists: ${newDirName}`]);
    return;
  }
  fileSystem[newDirId] = {
    id: newDirId,
    name: newDirName,
    type: "directory",
    children: [],
  };
  fileSystem[currentDir].children?.push(newDirId);
  await saveFileSystem(fileSystem);
  setOutput((prev) => [...prev, `Directory created: ${newDirName}`]);
};

export const rmdir: CommandHandler = async (
  args,
  output,
  setOutput,
  currentDir,
) => {
  if (args.length !== 1) {
    setOutput((prev) => [...prev, "Usage: rmdir <directory-name>"]);
    return;
  }
  const fileSystem = await getFileSystem();
  const dirName = args[0];
  const dirId = `${currentDir}/${dirName}`;
  if (!fileSystem[dirId] || fileSystem[dirId].type !== "directory") {
    setOutput((prev) => [...prev, `No such directory: ${dirName}`]);
    return;
  }
  delete fileSystem[dirId];
  fileSystem[currentDir].children = fileSystem[currentDir].children?.filter(
    (id) => id !== dirId,
  );
  await saveFileSystem(fileSystem);
  setOutput((prev) => [...prev, `Directory removed: ${dirName}`]);
};

export const touch: CommandHandler = async (
  args,
  output,
  setOutput,
  currentDir,
) => {
  if (args.length !== 1) {
    setOutput((prev) => [...prev, "Usage: touch <file-name>"]);
    return;
  }
  const fileSystem = await getFileSystem();
  const fileName = args[0];
  const fileId = `${currentDir}/${fileName}`;
  if (fileSystem[fileId]) {
    setOutput((prev) => [...prev, `File already exists: ${fileName}`]);
    return;
  }
  fileSystem[fileId] = {
    id: fileId,
    name: fileName,
    type: "file",
    content: "",
  };
  fileSystem[currentDir].children?.push(fileId);
  await saveFileSystem(fileSystem);
  setOutput((prev) => [...prev, `File created: ${fileName}`]);
};

export const rm: CommandHandler = async (
  args,
  output,
  setOutput,
  currentDir,
) => {
  if (args.length !== 1) {
    setOutput((prev) => [...prev, "Usage: rm <file-name>"]);
    return;
  }
  const fileSystem = await getFileSystem();
  const fileName = args[0];
  const fileId = `${currentDir}/${fileName}`;
  if (!fileSystem[fileId] || fileSystem[fileId].type !== "file") {
    setOutput((prev) => [...prev, `No such file: ${fileName}`]);
    return;
  }
  delete fileSystem[fileId];
  fileSystem[currentDir].children = fileSystem[currentDir].children?.filter(
    (id) => id !== fileId,
  );
  await saveFileSystem(fileSystem);
  setOutput((prev) => [...prev, `File removed: ${fileName}`]);
};

export const cd: CommandHandler = async (
  args,
  output,
  setOutput,
  currentDir,
  setCurrentDir,
) => {
  if (args.length !== 1) {
    setOutput((prev) => [...prev, "Usage: cd <directory-name>"]);
    return;
  }
  const fileSystem = await getFileSystem();
  const dirName = args[0];
  const newDirId = `${currentDir}/${dirName}`;
  if (!fileSystem[newDirId] || fileSystem[newDirId].type !== "directory") {
    setOutput((prev) => [...prev, `No such directory: ${dirName}`]);
    return;
  }
  setCurrentDir?.(newDirId);
  setOutput((prev) => [...prev, `Current directory: ${newDirId}`]);
};

const commands: { [key: string]: CommandHandler } = {
  help,
  clear,
  echo,
  date,
  ls,
  mkdir,
  rmdir,
  touch,
  rm,
  cd,
};

export default commands;
