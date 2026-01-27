import type { PhotoPost } from "../../types/posts/post";
import OptimizedImage from "../Ui/OptimizedImage";

export default function PhotoDetail({ post }: { post: PhotoPost }) {
  return (
    <article className="max-w-6xl mx-auto">
      {/* Main Image */}
      <div className="mb-8">
        <OptimizedImage
          src={post.image.url}
          thumbnail={post.image.thumbnail}
          alt={post.image.alt}
          className="w-full rounded-2xl shadow-2xl"
          style={{ minHeight: "400px" }}
        />
      </div>

      {/* Title and Caption */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
          {post.title}
        </h1>
        {post.image.caption && (
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {post.image.caption}
          </p>
        )}
      </div>

      {/* Image Info */}
      {(post.image.width || post.image.height) && (
        <div className="max-w-4xl mx-auto mb-8 flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {post.image.width && <span>{post.image.width}px</span>}
          {post.image.width && post.image.height && <span>×</span>}
          {post.image.height && <span>{post.image.height}px</span>}
        </div>
      )}

      {/* Category & Tags */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap justify-center gap-2">
        {post.category && (
          <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            {post.category}
          </span>
        )}
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <a
          href={post.image.url}
          download
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Descargar imagen HD
        </a>
      </div>
    </article>
  );
}
