import type { LinkPost } from "../../types/posts/post";
import OptimizedImage from "../Ui/OptimizedImage";

export default function LinkDetail({ post }: { post: LinkPost }) {
  return (
    <article className="max-w-3xl mx-auto">
      {/* Preview Card */}
      <div className="block mb-8 rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-700">
        {post.image && (
          <OptimizedImage
            src={post.image.url}
            thumbnail={post.image.thumbnails?.medium || post.image.url}
            alt={post.image.alt}
            className="aspect-[2/1] w-full bg-gray-100 dark:bg-gray-950"
          />
        )}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            {post.favicon && (
              <img src={post.favicon} alt="" className="w-6 h-6" />
            )}
            {post.siteName && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {post.siteName}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {post.description}
            </p>
          )}
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            <span>Visitar sitio</span>
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
