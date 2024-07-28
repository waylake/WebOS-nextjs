import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const TextEditor: React.FC = () => {
  const [text, setText] = useState("");

  const handleSave = () => {
    // Here you would typically save the text to a file or state
    console.log("Saving text:", text);
    alert("Text saved!");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Text Editor
      </h2>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
        className="w-full h-64 mb-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
      />
      <Button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        Save
      </Button>
    </div>
  );
};
