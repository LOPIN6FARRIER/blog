import type { MusicPost } from "../../types/posts/post";

interface MediaPlayerProps {
  post: MusicPost;
  isPlaying: boolean;
  currentTime: string;
  duration: string;
  progress: number;
  onTogglePlay: () => void;
  showPlayButton?: boolean; // Flag to show/hide play button (for future functionality)
}

export default function MediaPlayer({
  post,
  isPlaying,
  currentTime = "0:00",
  duration = "0:00",
  progress = 0,
  onTogglePlay,
  showPlayButton = true,
}: MediaPlayerProps) {
  return (
    <div className="col-span-2 relative">
      <a
        href={`/posts/${post.id}`}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-lg hover:bg-white dark:hover:bg-zinc-700 transition-colors shadow-sm"
        title="Ver detalles"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          className="fill-zinc-700 dark:fill-zinc-300"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
        </svg>
      </a>
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
          {showPlayButton && (
            <div className="flex shrink-0 items-center justify-center rounded-full size-12 bg-primary text-white shadow-md opacity-50 cursor-not-allowed">
              <span className="material-symbols-outlined fill-1 text-2xl">
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </div>
          )}
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
