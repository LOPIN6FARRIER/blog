import type { ArticlePost } from "../../types/posts/post";
export default function ArticleCard(props: ArticlePost) {
  return (
    <div className="masonry-item bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm relative hover:shadow-lg transition-shadow">
      <a
        href={`/posts/${props.id}`}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-lg hover:bg-white dark:hover:bg-zinc-700 transition-colors shadow-sm"
        title="Ver detalles"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          className="fill-zinc-700 dark:fill-zinc-300"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
        </svg>
      </a>
      <div
        className="w-full aspect-4/5 bg-cover bg-center hover:scale-105 transition-transform"
        data-alt={props.coverImage?.alt}
        style={{ backgroundImage: `url('${props.coverImage?.url}')` }}
      ></div>
      <div className="p-4">
        <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">
          {props.category}
        </p>
        <h4 className="text-sm font-bold leading-snug mb-2 text-[#111418] dark:text-white">
          {props.title}
        </h4>
        {props.excerpt && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
            {props.excerpt}
          </p>
        )}
        {props.readTime && (
          <div className="flex items-center justify-between mt-4">
            <a
              href={`/posts/${props.id}`}
              className="inline-block bg-secondary dark:bg-sky-700 text-black dark:text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-secondary-light dark:hover:bg-secondary"
            >
              Read More
            </a>
            <span className="material-symbols-outlined text-gray-300 text-lg hover:text-primary">
              bookmark
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
