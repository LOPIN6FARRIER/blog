import React from "react";
import type { VideoPost } from "../../types/posts/post";

interface YouTubeLinkCardProps {
  post: VideoPost;
}

export default function YouTubeLinkCard({ post }: YouTubeLinkCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
      <div
        className="relative w-full aspect-video bg-cover bg-center"
        data-alt={post.video.thumbnail || "Video thumbnail"}
        style={{ backgroundImage: `url('${post.video.thumbnail || ""}')` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-primary text-white size-10 rounded-full flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined ml-1">play_arrow</span>
          </div>
        </div>
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
