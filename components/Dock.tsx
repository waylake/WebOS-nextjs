import React from "react";
import { Button } from "./ui/button";
import {
  Folder,
  Terminal as TerminalIcon,
  FileText,
  Settings,
} from "lucide-react";
import { FileExplorer, Terminal, TextEditor } from "./applications";

interface DockProps {
  openWindow: (title: string, component: React.ReactNode) => void;
}

const Dock: React.FC<DockProps> = ({ openWindow }) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md text-white h-16 flex justify-center items-center space-x-2 rounded-t-xl">
      <Button
        variant="ghost"
        size="lg"
        className="h-12 w-12 rounded-full hover:bg-white hover:bg-opacity-20 p-0"
        onClick={() => openWindow("File Explorer", <FileExplorer />)}
      >
        <Folder size={24} className="text-white" />
      </Button>
      <Button
        variant="ghost"
        size="lg"
        className="h-12 w-12 rounded-full hover:bg-white hover:bg-opacity-20 p-0"
        onClick={() => openWindow("Terminal", <Terminal />)}
      >
        <TerminalIcon size={24} className="text-white" />
      </Button>
      <Button
        variant="ghost"
        size="lg"
        className="h-12 w-12 rounded-full hover:bg-white hover:bg-opacity-20 p-0"
        onClick={() => openWindow("Text Editor", <TextEditor />)}
      >
        <FileText size={24} className="text-white" />
      </Button>
      <Button
        variant="ghost"
        size="lg"
        className="h-12 w-12 rounded-full hover:bg-white hover:bg-opacity-20 p-0"
        onClick={() => openWindow("Settings", <div>Settings Content</div>)}
      >
        <Settings size={24} className="text-white" />
      </Button>
    </div>
  );
};

export default Dock;
