import { useRef } from "react";

interface ImageUploadProps {
  label?: string;
  previewUrl?: string;
  onSelect: (file: File) => void;
  onClear: () => void;
  accept?: string;
}

const ImageUpload = ({
  label = "Subir imagen",
  previewUrl,
  onSelect,
  onClear,
  accept = "image/*",
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSelect(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full max-h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={onClear}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
          >
            ×
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="w-full border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors"
        >
          <div className="text-zinc-500 dark:text-zinc-400">
            <svg
              className="w-8 h-8 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm">{label}</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
