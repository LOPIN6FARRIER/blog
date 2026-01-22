import { useRef } from "react";

interface MultiImageUploadProps {
  label?: string;
  files: File[];
  onSelect: (files: File[]) => void;
  onRemove: (index: number) => void;
  onClear: () => void;
  accept?: string;
  maxFiles?: number;
}

const MultiImageUpload = ({
  label = "Subir imágenes",
  files,
  onSelect,
  onRemove,
  onClear,
  accept = "image/*",
  maxFiles = 20,
}: MultiImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      const newFiles = [...files, ...selectedFiles].slice(0, maxFiles);
      onSelect(newFiles);
    }
    // Reset input to allow selecting the same file again
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        multiple
      />

      {/* Preview grid */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
              <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleClick}
          disabled={files.length >= maxFiles}
          className="flex-1 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="text-gray-500 dark:text-gray-400">
            <svg
              className="w-6 h-6 mx-auto mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="text-sm">{label}</span>
            <span className="text-xs block mt-1">
              {files.length}/{maxFiles} imágenes
            </span>
          </div>
        </button>

        {files.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="px-3 py-2 text-sm text-red-500 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiImageUpload;
