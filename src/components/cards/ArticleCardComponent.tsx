import React from "react";
import type { ArticlePost } from "../../types/posts/post";

interface ArticleCardProps {
  post: ArticlePost;
}

export default function ArticleCardComponent({ post }: ArticleCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
      <div
        className="bg-cover bg-center aspect-[4/5] p-4 flex flex-col justify-end"
        data-alt={post.coverImage?.alt || "Image"}
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url('${post.coverImage?.url || ""}')`,
        }}
      >
        <span className="bg-primary/20 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded w-fit mb-2">
          {post.category || "Article"}
        </span>
        <p className="text-white text-base font-bold leading-tight line-clamp-2">
          {post.title}
        </p>
      </div>
    </div>
  );
}
