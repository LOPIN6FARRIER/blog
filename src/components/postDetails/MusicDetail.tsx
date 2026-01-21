import type { MusicPost } from "../../types/posts/post";

export default function MusicDetail({ post }: { post: MusicPost }) {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-2xl p-8 md:p-12 mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Album Art */}
          {post.audio.coverUrl && (
            <div className="w-64 h-64 shrink-0 rounded-xl overflow-hidden shadow-2xl">
              <img
                src={post.audio.coverUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-2">
              {post.title}
            </h1>
            {post.audio.artist && (
              <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-4">
                {post.audio.artist}
              </p>
            )}
            {post.audio.album && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                Album: {post.audio.album}
              </p>
            )}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
              {post.audio.genre && (
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-xs font-semibold rounded-full">
                  {post.audio.genre}
                </span>
              )}
              {post.audio.duration && (
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 text-xs font-semibold rounded-full">
                  {post.audio.duration}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {post.audio.url && (
        <div className="mb-8 p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-lg">
          <audio controls className="w-full">
            <source src={post.audio.url} type="audio/mpeg" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      )}

      {/* Description */}
      {post.description && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            Acerca de esta canción
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {post.description}
          </p>
        </div>
      )}

      {/* External Links */}
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://open.spotify.com/search/${encodeURIComponent(post.title + " " + (post.audio.artist || ""))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          Abrir en Spotify
        </a>
      </div>
    </article>
  );
}
