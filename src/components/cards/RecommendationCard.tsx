import React from "react";
import type { RecommendationPost } from "../../types/posts/post";

export const RecommendationCard: React.FC<{ post: RecommendationPost }> = ({
  post,
}) => (
  <div className="px-4 mb-6">
    <div
      className="relative bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl overflow-hidden min-h-105 shadow-sm hover:shadow-xl transition-shadow"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 60%), url('${post.coverImage?.url}')`,
      }}
    >
      <a
        href={`/posts/${post.id}`}
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
      </a>
      <div className="p-6">
        <h2 className="text-white text-3xl font-bold leading-tight mb-2">
          {post.title}
        </h2>
        {post.description && (
          <p className="text-white/90 text-base font-normal mb-4">
            {post.description}
          </p>
        )}
        {post.recommendationType && (
          <p className="text-white/80 text-sm font-medium mb-2">
            Tipo: {post.recommendationType}
          </p>
        )}
        {post.externalUrl && (
          <a
            href={post.externalUrl}
            className="inline-block bg-secondary text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg"
          >
            Ver más
          </a>
        )}
      </div>
    </div>
  </div>
);
