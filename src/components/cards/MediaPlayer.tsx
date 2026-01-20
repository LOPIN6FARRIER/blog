import React from "react";
import type { MusicPost } from "../../types/posts/post";

interface MediaPlayerProps {
  post: MusicPost;
  isPlaying: boolean;
  currentTime: string;
  duration: string;
  progress: number;
  onTogglePlay: () => void;
}

export default function MediaPlayer({
  post,
  isPlaying,
  currentTime = "0:00",
  duration = "0:00",
  progress = 0,
  onTogglePlay,
}: MediaPlayerProps) {
  return (
    <div className="col-span-2">
      <div className="rounded-xl bg-white dark:bg-zinc-800 p-4 border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 shrink-0 shadow-lg"
            data-alt={post.audio.coverUrl || "Album cover"}
            style={{ backgroundImage: `url('${post.audio.coverUrl || ""}')` }}
          ></div>
          <div className="flex-1 min-w-0">
            <p className="text-[#111418] dark:text-white text-lg font-bold leading-tight truncate">
              {post.audio.title}
            </p>
            <p className="text-[#617589] dark:text-zinc-400 text-sm font-medium leading-normal truncate">
              {post.audio.artist}
              {post.audio.genre && ` • ${post.audio.genre}`}
            </p>
          </div>
          <button
            onClick={onTogglePlay}
            className="flex shrink-0 items-center justify-center rounded-full size-12 bg-primary text-white shadow-md active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined fill-1 text-2xl">
              {isPlaying ? "pause" : "play_arrow"}
            </span>
          </button>
        </div>
        <div className="mt-4">
          <div className="flex h-1.5 items-center justify-center w-full bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[#617589] dark:text-zinc-500 text-[10px] font-bold tracking-tighter uppercase">
              {currentTime}
            </p>
            <p className="text-[#617589] dark:text-zinc-500 text-[10px] font-bold tracking-tighter uppercase">
              {duration}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
