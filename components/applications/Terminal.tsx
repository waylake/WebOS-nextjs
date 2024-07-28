import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import commands, { CommandHandler } from "../../lib/commands";

export const Terminal: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>(["Welcome to WebOS Terminal"]);
  const [currentDir, setCurrentDir] = useState<string>("root");
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = async (command: string) => {
    const [cmd, ...args] = command.split(" ");
    const handler: CommandHandler | undefined = commands[cmd.toLowerCase()];
    if (handler) {
      await handler(args, output, setOutput, currentDir, setCurrentDir);
    } else {
      setOutput((prev) => [
        ...prev,
        `$ ${command}`,
        `Command not found: ${cmd}`,
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setOutput((prev) => [...prev, `${currentDir} $ ${input.trim()}`]);
      handleCommand(input.trim());
      setInput("");
    }
  };

  return (
    <div className="bg-gray-900 dark:bg-black text-green-500 p-4 rounded-lg shadow flex flex-col h-full">
      <div ref={outputRef} className="flex-1 overflow-y-auto mb-4">
        {output.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <span className="mr-2 text-green-500">{currentDir} $</span>
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
