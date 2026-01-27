import type { GalleryPost } from "../../types/posts/post";
import { useState } from "react";
import OptimizedImage from "../Ui/OptimizedImage";

export default function GalleryDetail({ post }: { post: GalleryPost }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <article className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {post.description}
          </p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {post.images.length}{" "}
          {post.images.length === 1 ? "imagen" : "imágenes"}
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {post.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="aspect-square rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
          >
            <OptimizedImage
              src={image.url}
              thumbnail={image.thumbnails?.medium || image.url}
              alt={image.alt || `Imagen ${index + 1}`}
              className="w-full h-full"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous Button */}
          {selectedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex - 1);
              }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors"
            >
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Image */}
          <img
            src={post.images[selectedIndex].url}
            alt={
              post.images[selectedIndex].alt || `Imagen ${selectedIndex + 1}`
            }
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next Button */}
          {selectedIndex < post.images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex + 1);
              }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors"
            >
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {selectedIndex + 1} / {post.images.length}
          </div>
        </div>
      )}
    </article>
  );
}
