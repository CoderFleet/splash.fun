"use client";

import { useState, useCallback } from "react";
import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";

type TokenImageDropzoneProps = {
  onFileAccepted: (file: File) => void;
};

export default function TokenImageDropzone({
  onFileAccepted,
}: TokenImageDropzoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      setDragActive(false);
      const file = event.dataTransfer.files?.[0];
      if (file) {
        setSelectedFile(file);
        onFileAccepted(file);
      }
    },
    [onFileAccepted]
  );

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileAccepted(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-gray-300 text-sm">Token Image</Label>

      <label
        htmlFor="file-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center space-y-4 transition-colors cursor-pointer 
          overflow-hidden break-words
          ${
            dragActive
              ? "border-pink-400 bg-pink-50/5"
              : "border-gray-600 hover:border-gray-500"
          }`}>
        <input
          id="file-upload"
          type="file"
          accept=".svg,.png,.jpg,.jpeg,.gif"
          onChange={handleFileChange}
          className="hidden"
        />

        <Upload className="w-8 h-8 text-gray-400" />

        <div className="space-y-1">
          <p className="text-pink-400 font-medium">
            {selectedFile ? "File Selected" : "Click to upload"}
          </p>
          <p className="text-gray-400 text-sm">or drag and drop</p>
          <p className="text-gray-500 text-xs">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>

        {selectedFile && (
          <div className="mt-2 w-full text-sm text-gray-300 truncate">
            {selectedFile.name}
          </div>
        )}
      </label>
    </div>
  );
}
