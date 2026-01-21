import type { ArticlePost } from "../../types/posts/post";

export default function ArticleDetail({ post }: { post: ArticlePost }) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Hero Image */}
      {post.coverImage && (
        <div className="w-full aspect-[21/9] mb-8 rounded-2xl overflow-hidden">
          <img
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        {post.category && (
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-semibold rounded-full mb-4">
            {post.category}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
          {post.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          {post.author && (
            <div className="flex items-center gap-2">
              <span className="font-medium">{post.author.name}</span>
            </div>
          )}
          {post.createdAt && (
            <time>{new Date(post.createdAt).toLocaleDateString()}</time>
          )}
          {post.readTime && (
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {post.readTime} min
            </span>
          )}
        </div>
      </header>

      {/* Content */}
      {post.content && (
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <div
            className="text-zinc-700 dark:text-zinc-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-8 border-t border-zinc-200 dark:border-zinc-700">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
