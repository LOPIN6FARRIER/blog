import type { LinkPost } from "../../types/posts/post";

interface CompactLinkCardProps {
  post: LinkPost;
}

export default function CompactLinkCard({ post }: CompactLinkCardProps) {
  return (
    <div className="bg-primary p-4 rounded-xl shadow-sm text-white relative hover:shadow-lg transition-shadow">
      <a
        href={`/posts/${post.id}`}
        className="absolute top-2 right-2 z-10 p-1.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
        title="Ver detalles"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16px"
          viewBox="0 -960 960 960"
          width="16px"
          className="fill-white"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
        </svg>
      </a>
      <span className="material-symbols-outlined mb-2">link</span>
      <p className="text-sm font-bold leading-tight mb-2">{post.title}</p>
      <p className="text-white/80 text-[11px] leading-snug mb-3">
        {post.description || "No description available."}
      </p>
      <span className="bg-white text-primary text-[11px] font-bold px-3 py-1.5 rounded-full w-fit inline-block">
        Ver detalles
      </span>
    </div>
  );
}
