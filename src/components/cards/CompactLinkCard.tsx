import React from "react";
import type { LinkPost } from "../../types/posts/post";

interface CompactLinkCardProps {
  post: LinkPost;
}

export default function CompactLinkCard({ post }: CompactLinkCardProps) {
  return (
    <div className="bg-primary p-4 rounded-xl shadow-sm text-white">
      <span className="material-symbols-outlined mb-2">link</span>
      <p className="text-sm font-bold leading-tight mb-2">{post.title}</p>
      <p className="text-white/80 text-[11px] leading-snug mb-3">
        {post.description || "No description available."}
      </p>
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-primary text-[11px] font-bold px-3 py-1.5 rounded-full w-fit inline-block"
      >
        Open Link
      </a>
    </div>
  );
}
