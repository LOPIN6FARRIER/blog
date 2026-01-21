import type { RatingPost } from "../../types/posts/post";

export default function RatingDetail({ post }: { post: RatingPost }) {
  const typeLabels = {
    serie: "Serie",
    película: "Película",
    libro: "Libro",
    podcast: "Podcast",
    otro: "Otro",
  };

  const percentage = (post.rating / 10) * 100;

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header with Cover */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-2xl p-8 md:p-12 mb-8">
        <div className="md:flex md:gap-8 items-center">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="w-48 h-72 mx-auto md:mx-0 shrink-0 rounded-xl overflow-hidden shadow-2xl mb-6 md:mb-0">
              <img
                src={post.coverImage.url}
                alt={post.coverImage.alt}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm font-semibold rounded-full mb-4">
              {typeLabels[post.itemType]}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              {post.subjectTitle}
            </h1>

            {/* Rating Score */}
            <div className="inline-block">
              {/* Circular Progress */}
              <div className="relative w-40 h-40 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    className="stroke-zinc-200 dark:stroke-zinc-700"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    className="stroke-blue-600 dark:stroke-blue-400"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-zinc-900 dark:text-white">
                    {post.rating.toFixed(1)}
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400 text-sm">
                    /10
                  </span>
                </div>
              </div>

              {/* Liked Badge */}
              {post.liked !== undefined && (
                <div className="flex items-center justify-center gap-2">
                  {post.liked ? (
                    <>
                      <svg
                        className="w-6 h-6 text-green-600 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        Me gustó
                      </span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 text-red-600 dark:text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                      </svg>
                      <span className="text-red-600 dark:text-red-400 font-semibold">
                        No me gustó
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Comment/Review */}
      {post.comment && (
        <div className="p-8 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            Mi Opinión
          </h2>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
            {post.comment}
          </p>
        </div>
      )}
    </article>
  );
}
