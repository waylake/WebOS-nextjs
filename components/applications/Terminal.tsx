import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";

export const Terminal: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>(["Welcome to WebOS Terminal"]);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = (command: string) => {
    setOutput((prev) => [...prev, `$ ${command}`]);
    switch (command.toLowerCase()) {
      case "help":
        setOutput((prev) => [...prev, "Available commands: help, echo, clear"]);
        break;
      case "clear":
        setOutput([]);
        break;
      default:
        if (command.toLowerCase().startsWith("echo ")) {
          setOutput((prev) => [...prev, command.slice(5)]);
        } else {
          setOutput((prev) => [...prev, `Command not found: ${command}`]);
        }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim());
      setInput("");
    }
  };

  return (
    <div className="bg-gray-900 dark:bg-black text-green-500 p-4 rounded-lg shadow h-[400px] flex flex-col">
      <div ref={outputRef} className="flex-1 overflow-y-auto mb-4">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <span className="mr-2 text-green-500">$</span>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none text-green-500 flex-1 focus:outline-none placeholder-green-700"
          placeholder="Type a command..."
        />
      </form>
    </div>
  );
};
