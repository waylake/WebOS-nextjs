import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Edit, Save, X } from "lucide-react";
import { FileSystemItem } from "../../../lib/fileSystem";
import ImagePreview from "./previews/ImagePreview";

interface FilePreviewProps {
  file: FileSystemItem;
  onClose: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(file.content || "");

  const isTextFile = file.name.endsWith(".txt");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically save the changes to the file system
    setIsEditing(false);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            {file.name}
          </DialogTitle>
        </DialogHeader>
        {file.name.endsWith(".jpg") || file.name.endsWith(".png") ? (
          <ImagePreview file={file} />
        ) : (
          <div>
            {isEditing ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full h-64 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            ) : (
              <pre className="whitespace-pre-wrap text-gray-900 dark:text-gray-100">
                {file.content}
              </pre>
            )}
            {isTextFile && (
              <div className="flex justify-end mt-4">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      className="mr-2 bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Save size={16} className="mr-2" /> Save
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="text-gray-900 dark:text-gray-100"
                    >
                      <X size={16} className="mr-2" /> Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleEdit}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Edit size={16} className="mr-2" /> Edit
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
