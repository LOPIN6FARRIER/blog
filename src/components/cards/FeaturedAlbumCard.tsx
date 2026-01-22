import React from "react";
import type { MusicPost } from "../../types/posts/post";

interface FeaturedAlbumCardProps {
  post: MusicPost;
  isPlaying: boolean;
  onTogglePlay: () => void;
  variant?: "default" | "bordered";
}

export default function FeaturedAlbumCard({
  post,
  isPlaying,
  onTogglePlay,
  variant = "default",
}: FeaturedAlbumCardProps) {
  // Added playback progress indicator
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div
      className={`${
        variant === "bordered"
          ? "card-border"
          : "rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm"
      } bg-white dark:bg-gray-900 overflow-hidden`}
    >
      <div className="flex flex-col items-stretch">
        {/* Added redirection to individual post page */}
        <a href={`/posts/${post.id}`} className="block">
          <div
            className="w-full bg-center bg-no-repeat aspect-square bg-cover"
            data-alt={post.audio.coverUrl || "Album cover"}
            style={{ backgroundImage: `url('${post.audio.coverUrl || ""}')` }}
          ></div>
        </a>
        <div className="flex flex-col gap-4 p-5">
          <div>
            <p className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
              {post.musicType === "album" ? "Album" : "Now Playing"}
            </p>
            <p className="text-[#111418] dark:text-white text-xl font-bold leading-tight">
              {post.audio.title}
            </p>
            {post.musicType === "album" && post.totalTracks && (
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                {post.totalTracks} canciones
              </p>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="flex flex-col">
              {post.audio.artist && (
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  {post.audio.artist}
                </p>
              )}
              {post.audio.album && (
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                  Album: {post.audio.album}
                </p>
              )}
              {post.musicType === "album" && post.releaseDate && (
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                  {new Date(post.releaseDate).getFullYear()}
                </p>
              )}
            </div>
            {/* Only show play button for tracks, not albums */}
            {post.musicType !== "album" && (
              <button
                onClick={onTogglePlay}
                className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined fill-1">
                  {isPlaying ? "pause" : "play_arrow"}
                </span>
              </button>
            )}
          </div>
          {/* Playback progress indicator - only for tracks */}
          {post.musicType !== "album" && (
            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
              <div
                className="bg-primary h-1.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
