import type { MusicPost } from "../../types/posts/post";
import OptimizedImage from "../Ui/OptimizedImage";

export default function MusicDetail({ post }: { post: MusicPost }) {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-2xl p-8 md:p-12 mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Album Art */}
          {post.audio.coverUrl && (
            <OptimizedImage
              src={post.audio.coverUrl}
              thumbnail={post.audio.coverUrl}
              alt={post.title}
              className="w-64 h-64 shrink-0 rounded-xl overflow-hidden shadow-2xl"
            />
          )}

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-2">
              {post.title}
            </h1>
            {post.audio.artist && (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                {post.audio.artist}
              </p>
            )}
            {post.audio.album && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
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

      {/* Description */}
      {post.description && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            {post.musicType === "album"
              ? "Acerca de este álbum"
              : "Acerca de esta canción"}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {post.description}
          </p>
        </div>
      )}

      {/* Tracks List - Only for albums */}
      {post.musicType === "album" && post.tracks && post.tracks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            Canciones ({post.totalTracks || post.tracks.length})
          </h2>
          <div className="space-y-2">
            {post.tracks.map((track, index) => (
              <div
                key={track.id || index}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-sm font-mono text-gray-400 w-8">
                  {track.trackNumber}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-zinc-900 dark:text-white truncate">
                    {track.name}
                    {track.explicit && (
                      <span className="ml-2 text-xs text-red-500">E</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {track.artists}
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                  {track.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Release Date & Total Tracks Info */}
      {(post.releaseDate || post.totalTracks) && (
        <div className="mb-8 flex gap-4 text-sm text-gray-600 dark:text-gray-400">
          {post.releaseDate && (
            <span>
              Lanzamiento:{" "}
              {new Date(post.releaseDate).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
          {post.musicType === "album" && post.totalTracks && (
            <span>• {post.totalTracks} canciones</span>
          )}
        </div>
      )}

      {/* External Links */}
      <div className="flex flex-wrap gap-3">
        {post.spotifyUrl && (
          <a
            href={post.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            Abrir en Spotify
          </a>
        )}
        {post.appleMusicUrl && (
          <a
            href={post.appleMusicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043a5.96 5.96 0 0 0-1.877-.726 11.35 11.35 0 0 0-1.847-.137c-.317 0-.633 0-.95.028-.95.056-1.906.137-2.85.316-1.9.317-3.8.634-5.71.95-1.81.317-3.61.634-5.42.95-.48.084-.96.167-1.44.257-.48.08-.96.17-1.44.274C.7 2.913.34 3.15.1 3.58a2.24 2.24 0 0 0-.1.68c0 .32 0 .64.01.96.084 4.27.167 8.54.27 12.81.023.966.055 1.933.1 2.9.028.479.07.958.137 1.437.11.726.38 1.38.876 1.902.59.624 1.332.976 2.186 1.062.71.07 1.42.084 2.13.084h14.7c1.184 0 2.368-.015 3.552-.056 1.31-.063 2.186-.85 2.39-2.14.056-.366.08-.733.1-1.1.045-.915.08-1.83.1-2.745.056-2.39.1-4.78.14-7.17.023-1.184.03-2.368.03-3.552z" />
            </svg>
            Apple Music
          </a>
        )}
        {post.youtubeUrl && (
          <a
            href={post.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            YouTube
          </a>
        )}
      </div>
    </article>
  );
}
