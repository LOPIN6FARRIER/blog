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

export default function MediaPlayer({ post }: MediaPlayerProps) {
  return (
    <a href={`/posts/${post.id}`} className="col-span-2 block">
      <div className="rounded-xl bg-white dark:bg-gray-900 p-4 border border-blue-200 dark:border-gray-900 shadow-sm hover:shadow-md transition-shadow">
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
            <p className="text-[#617589] dark:text-gray-400 text-sm font-medium leading-normal truncate">
              {post.audio.artist}
              {post.audio.genre && ` • ${post.audio.genre}`}
              {post.audio.duration && ` • ${post.audio.duration}`}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
