"use client";

import { useCallback, useState } from "react";
import { Upload, X, FileText, Image as ImageIcon, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onChange?: (files: File[]) => void;
  error?: string;
  helperText?: string;
  className?: string;
}

export function MinimalFileUpload({
  label,
  accept = "image/*",
  multiple = false,
  maxSize = 5,
  onChange,
  error,
  helperText,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (fileList: FileList) => {
      const newFiles = Array.from(fileList).filter(
        (file) => file.size <= maxSize * 1024 * 1024
      );
      const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
      setFiles(updatedFiles);
      onChange?.(updatedFiles);
    },
    [files, maxSize, multiple, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon size={18} className="text-blue-500" />;
    }
    if (file.type.includes("pdf")) {
      return <FileText size={18} className="text-red-500" />;
    }
    return <File size={18} className="text-slate-500" />;
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 text-center transition-smooth cursor-pointer",
          isDragging
            ? "border-blue-400 bg-blue-50"
            : error
            ? "border-red-300 bg-red-50/50"
            : "border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:bg-blue-50/30"
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-3">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-smooth",
              isDragging ? "bg-blue-100" : "bg-slate-100"
            )}
          >
            <Upload
              size={22}
              className={cn(
                "transition-smooth",
                isDragging ? "text-blue-500" : "text-slate-400"
              )}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">
              <span className="text-blue-500">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Maximum file size: {maxSize}MB
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      
      {/* Helper Text */}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-slate-400">{helperText}</p>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-200 group transition-smooth hover:border-slate-300"
            >
              {getFileIcon(file)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-smooth opacity-0 group-hover:opacity-100"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Keep BrutalFileUpload as an alias for backwards compatibility
export const BrutalFileUpload = MinimalFileUpload;
