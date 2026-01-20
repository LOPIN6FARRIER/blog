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
  return (
    <div
      className={`${
        variant === "bordered"
          ? "card-border"
          : "rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm"
      } bg-white dark:bg-gray-900 overflow-hidden`}
    >
      <div className="flex flex-col items-stretch">
        <div
          className="w-full bg-center bg-no-repeat aspect-square bg-cover"
          data-alt={post.audio.coverUrl || "Album cover"}
          style={{ backgroundImage: `url('${post.audio.coverUrl || ""}')` }}
        ></div>
        <div className="flex flex-col gap-4 p-5">
          <div>
            <p className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
              Now Playing
            </p>
            <p className="text-[#111418] dark:text-white text-xl font-bold leading-tight">
              {post.audio.title}
            </p>
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
            </div>
            <button
              onClick={onTogglePlay}
              className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined fill-1">
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
