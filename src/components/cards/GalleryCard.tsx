import { useState } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import type { GalleryPost } from "../../types/posts/post";

export default function GalleryCard({ post }: { post: GalleryPost }) {
  const maxItems = 4;
  const [showAll, setShowAll] = useState(false);

  const visibleImages = showAll ? post.images : post.images.slice(0, maxItems);

  // Configuración de breakpoints para Masonry según las columnas del post
  const breakpointColumns = {
    default: post.columns || 2,
    1100: post.columns && post.columns > 2 ? 2 : post.columns || 2,
    700: 1,
  };

  return (
    <section>
      <div className="flex items-center justify-between pb-4">
        <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-tight">
          {post.title}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-gray-400">
            {String(post.images.length).padStart(2, "0")} IMAGES
          </span>
          <Link
            to={`/posts/${post.id}`}
            className="p-2 bg-white dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm border border-blue-200 dark:border-gray-700"
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
          </Link>
        </div>
      </div>
      <Masonry
        breakpointCols={breakpointColumns}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {visibleImages.map((image, index) => (
          <div
            key={index}
            className={`${
              post.layout === "grid"
                ? "rounded-lg border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:border-secondary"
                : "card-border hover:shadow-lg hover:border-secondary"
            } p-1 bg-white dark:bg-gray-900 transition-all duration-300`}
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded"
              data-alt={image.alt}
              style={{ backgroundImage: `url('${image.url}')` }}
            ></div>
          </div>
        ))}
      </Masonry>
      {post.images.length > maxItems && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-secondary text-black dark:text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-secondary-light dark:hover:bg-secondary"
          >
            {showAll ? "Show Less" : "Ver más"}
          </button>
        </div>
      )}
    </section>
  );
}
