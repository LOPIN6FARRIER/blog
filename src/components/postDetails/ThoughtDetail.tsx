import type { ThoughtPost } from "../../types/posts/post";

export default function ThoughtDetail({ post }: { post: ThoughtPost }) {
  return (
    <article className="max-w-3xl mx-auto min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        {post.style === "quote" ? (
          <>
            <svg
              className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-6 opacity-50"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
            </svg>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-zinc-800 dark:text-zinc-200 mb-6 leading-relaxed">
              "{post.content}"
            </blockquote>
            {post.source && (
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                — {post.source}
              </p>
            )}
          </>
        ) : post.style === "note" ? (
          <div className="p-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-r-xl">
            <p className="text-2xl md:text-3xl font-light text-zinc-800 dark:text-zinc-200 leading-relaxed">
              {post.content}
            </p>
            {post.source && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4">
                {post.source}
              </p>
            )}
          </div>
        ) : (
          // idea style
          <div className="relative">
            <svg
              className="w-16 h-16 text-purple-600 dark:text-purple-400 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <p className="text-2xl md:text-3xl font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
              {post.content}
            </p>
            {post.source && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4">
                {post.source}
              </p>
            )}
          </div>
        )}

        {/* Share Button */}
        <div className="mt-12 flex justify-center gap-4">
          <button
            onClick={() => {
              navigator.clipboard.writeText(post.content);
            }}
            className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium transition-colors flex items-center gap-2"
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
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copiar
          </button>
        </div>
      </div>
    </article>
  );
}
