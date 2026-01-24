import { useState } from "react";
import { Link } from "react-router-dom";
import type { ArticlePost } from "../../types/posts/post";

export default function ContentCard(props: ArticlePost) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <div className="col-span-2 p-4 bg-white dark:bg-gray-900 rounded-xl border border-blue-200 dark:border-gray-900 shadow-sm flex flex-col @container relative hover:shadow-lg transition-shadow">
      <Link
        to={`/posts/${props.id}`}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-sm"
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
      </Link>
      <div className="flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start">
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
          data-alt={props.coverImage?.alt || "Cover Image"}
          style={{ backgroundImage: `url('${props.coverImage?.url}')` }}
        ></div>
        <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
          <p className="text-[#111418] dark:text-white text-xl font-bold leading-tight tracking-tight">
            {props.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">
              {props.category}
            </span>
            {props.readTime && (
              <>
                <span className="size-1 rounded-full bg-zinc-300"></span>
                <span className="text-[#617589] dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  {props.readTime}
                </span>
              </>
            )}
          </div>
          {props.excerpt && (
            <>
              <p
                className={`text-gray-600 dark:text-gray-400 text-sm mt-2 font-medium ${
                  isExpanded ? "line-clamp-none" : "line-clamp-2"
                }`}
              >
                {props.excerpt}
              </p>
              <button
                onClick={toggleDescription}
                className="text-primary text-xs font-bold mt-2 hover:underline"
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
