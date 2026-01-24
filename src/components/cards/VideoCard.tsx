import { Link } from "react-router-dom";
import type { VideoPost } from "../../types/posts/post";

interface VideoCardProps {
  showPlayButton?: boolean; // Flag to show/hide play button (for future functionality)
}

// Updated VideoCard to display video content
export default function VideoCard(props: VideoPost & VideoCardProps) {
  const { showPlayButton = true, ...post } = props;
  return (
    <div className="px-4 mb-6">
      <div className="relative flex flex-col items-stretch justify-end rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
        <Link
          to={`/posts/${props.id}`}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-sm"
          title="Ver detalles"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            className="fill-zinc-700"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
          </svg>
        </Link>
        <div
          className="w-full aspect-video rounded-t-xl bg-gray-950 flex items-center justify-center relative"
          style={{
            backgroundImage: post.video?.thumbnail
              ? `url('${post.video.thumbnail}')`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {showPlayButton && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="opacity-70">
                <svg
                  className="w-16 h-16 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 bg-gray-950 dark:bg-gray-900">
          <h2 className="text-white text-2xl font-bold leading-tight mb-2">
            {post.title}
          </h2>
          {post.description && (
            <p className="text-white/90 text-base font-normal mb-4">
              {post.description}
            </p>
          )}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400 dark:text-gray-500">
              {post.category}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Click para ver
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
