import type { RecommendationPost } from "../../types/posts/post";

export default function RecommendationDetail({
  post,
}: {
  post: RecommendationPost;
}) {
  const renderStars = (rating?: number) => {
    if (!rating) return null;
    const stars = Math.round(rating / 2); // Convert 0-10 to 0-5 stars
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-6 h-6 ${i < stars ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const typeLabels = {
    serie: "Serie",
    película: "Película",
    libro: "Libro",
    podcast: "Podcast",
    otro: "Otro",
  };

  return (
    <article className="max-w-4xl mx-auto">
      <div className={post.compact ? "max-w-2xl mx-auto" : ""}>
        {/* Hero Section */}
        <div
          className={`bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-2xl p-8 md:p-12 mb-8 ${post.compact ? "" : "md:flex md:gap-8"}`}
        >
          {/* Cover Image */}
          {post.coverImage && (
            <div
              className={`${post.compact ? "w-48 h-72 mx-auto mb-6" : "w-64 h-96 shrink-0"} rounded-xl overflow-hidden shadow-2xl`}
            >
              <img
                src={post.coverImage.url}
                alt={post.coverImage.alt}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Info */}
          <div className={`flex-1 ${post.compact ? "text-center" : ""}`}>
            <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-sm font-semibold rounded-full mb-4">
              {typeLabels[post.recommendationType]}
            </span>
            <h1
              className={`${post.compact ? "text-3xl" : "text-4xl md:text-5xl"} font-bold text-zinc-900 dark:text-white mb-4`}
            >
              {post.subjectTitle}
            </h1>

            {/* Rating */}
            {post.rating && (
              <div
                className={`mb-6 ${post.compact ? "flex justify-center" : ""}`}
              >
                <div
                  className={`inline-flex items-center gap-4 p-4 bg-white/50 dark:bg-black/20 rounded-xl`}
                >
                  {renderStars(post.rating)}
                  <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                    {post.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/10</span>
                </div>
              </div>
            )}

            {/* Description */}
            {post.description && (
              <p
                className={`text-lg text-gray-700 dark:text-gray-300 leading-relaxed ${post.compact ? "" : "mb-6"}`}
              >
                {post.description}
              </p>
            )}

            {/* External Link */}
            {post.externalUrl && (
              <a
                href={post.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors mt-4"
              >
                <span>Ver más información</span>
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
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
