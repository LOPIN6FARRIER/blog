import type { RankingPost } from "../../types/posts/post";
import OptimizedImage from "../Ui/OptimizedImage";

export default function RankingDetail({ post }: { post: RankingPost }) {
  const typeLabels = {
    serie: "Serie",
    película: "Película",
    libro: "Libro",
    podcast: "Podcast",
    otro: "Otro",
  };

  return (
    <article className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        {post.coverImage && (
          <OptimizedImage
            src={post.coverImage.url}
            thumbnail={
              post.coverImage.thumbnails?.medium || post.coverImage.url
            }
            alt={post.coverImage.alt}
            className="w-full aspect-[21/9] mb-6 rounded-2xl overflow-hidden shadow-2xl"
          />
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {post.description}
          </p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          {post.items.length} {post.items.length === 1 ? "item" : "items"}
        </p>
      </div>

      {/* Ranking List */}
      <div className="space-y-4">
        {post.items
          .sort((a, b) => a.rank - b.rank)
          .map((item, index) => (
            <div
              key={index}
              className="flex gap-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-blue-200 dark:border-gray-700"
            >
              {/* Rank Number */}
              <div className="flex items-center justify-center w-16 h-16 shrink-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <span className="text-3xl font-bold text-white">
                  {item.rank}
                </span>
              </div>

              {/* Cover Image */}
              {item.coverImage && (
                <OptimizedImage
                  src={item.coverImage.url}
                  thumbnail={
                    item.coverImage.thumbnails?.medium || item.coverImage.url
                  }
                  alt={item.coverImage.alt}
                  className="w-24 h-32 shrink-0 rounded-lg overflow-hidden shadow-md"
                />
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {item.subjectTitle}
                  </h3>
                  {item.rating && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg shrink-0">
                      <svg
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-zinc-900 dark:text-white">
                        {item.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-sm font-medium rounded-full mb-3">
                  {typeLabels[item.itemType]}
                </span>

                {item.description && (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {item.externalUrl && (
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mt-2"
                  >
                    <span>Ver más</span>
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>
    </article>
  );
}
