import React from "react";
import type { ThoughtPost } from "../../types/posts/post";

interface ThreadLinkCardProps {
  post: ThoughtPost;
}

export default function ThreadLinkCard({ post }: ThreadLinkCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-primary"
          data-icon="post_add"
        >
          <span className="material-symbols-outlined text-sm">post_add</span>
        </div>
        <span className="text-[#617589] text-[10px] font-bold uppercase tracking-wider">
          Thread
        </span>
      </div>
      <p className="text-[#111418] dark:text-white text-sm font-bold leading-tight mb-2">
        {post.content}
      </p>
      {post.source && (
        <p className="text-[#617589] text-xs leading-relaxed line-clamp-3 mb-3 italic">
          {post.source}
        </p>
      )}
      {post.style && (
        <div
          className="w-full aspect-video rounded-lg bg-cover bg-center mb-3"
          data-alt="Thread image"
          style={{ backgroundImage: `url('${post.style}')` }}
        ></div>
      )}
      <button className="w-full bg-[#f0f2f4] dark:bg-gray-800 text-[#111418] dark:text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-2">
        <span className="material-symbols-outlined text-sm">open_in_new</span>
        View Thread
      </button>
    </div>
  );
}
