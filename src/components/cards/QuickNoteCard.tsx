import React from "react";
import type { ThoughtPost } from "../../types/posts/post";

interface QuickNoteCardProps {
  post: ThoughtPost;
}

export default function QuickNoteCard({ post }: QuickNoteCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-2">
        <div className="size-2 rounded-full bg-green-500"></div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#617589]">
          Quick Note
        </span>
      </div>
      <p className="text-[#111418] dark:text-white text-sm font-medium leading-relaxed">
        {post.content}
      </p>
    </div>
  );
}
