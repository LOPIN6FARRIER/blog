import type { VideoPost } from "../../types/posts/post";

interface YouTubeLinkCardProps {
  post: VideoPost;
  showPlayButton?: boolean; // Flag to show/hide play button (for future functionality)
}

export default function YouTubeLinkCard({
  post,
  showPlayButton = true,
}: YouTubeLinkCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 relative hover:shadow-lg transition-shadow">
      <a
        href={`/posts/${post.id}`}
        className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-sm"
        title="Ver detalles"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
          className="fill-zinc-700 dark:fill-zinc-300"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
        </svg>
      </a>
      <div
        className="relative w-full aspect-video bg-cover bg-center"
        data-alt={post.video.thumbnail || "Video thumbnail"}
        style={{ backgroundImage: `url('${post.video.thumbnail || ""}')` }}
      >
        {showPlayButton && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary/70 text-white size-10 rounded-full flex items-center justify-center shadow-lg cursor-not-allowed">
              <span className="material-symbols-outlined ml-1">play_arrow</span>
            </div>
          </div>
        )}
        {post.video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
            {post.video.duration}
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1 mb-1">
          <span className="material-symbols-outlined text-primary text-xs">
            smart_display
          </span>
          <span className="text-[#617589] text-[10px] font-bold uppercase tracking-wider">
            YouTube
          </span>
        </div>
        <p className="text-[#111418] dark:text-white text-sm font-bold leading-snug line-clamp-2">
          {post.title}
        </p>
        <button className="mt-3 w-full bg-primary/10 text-primary text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1">
          Watch Video
        </button>
      </div>
    </div>
  );
}
