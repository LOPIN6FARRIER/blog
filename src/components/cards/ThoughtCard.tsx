import type { ThoughtPost } from "../../types/posts/post";

export default function ThoughtCard(props: ThoughtPost) {
  return (
    <div className="col-span-1 rounded-xl p-6 flex flex-col justify-between h-auto aspect-3/4 bg-white dark:bg-gray-900 border-2 border-blue-200 dark:border-gray-700 relative hover:shadow-xl hover:border-primary dark:hover:border-primary transition-all shadow-md">
      <a
        href={`/posts/${props.id}`}
        className="absolute top-3 right-3 z-10 p-2 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-md border border-blue-200 dark:border-gray-600"
        title="Ver detalles"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16px"
          viewBox="0 -960 960 960"
          width="16px"
          className="fill-zinc-700 dark:fill-zinc-300"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
        </svg>
      </a>
      <div className="size-10 rounded-full flex items-center justify-center bg-primary/10 dark:bg-primary/20 border border-primary/30">
        <span className="material-symbols-outlined text-lg text-primary">
          light_mode
        </span>
      </div>
      <p className="text-base font-medium leading-relaxed text-gray-800 dark:text-gray-100">
        {props.content}
      </p>
      <div className="flex items-center gap-2">
        <div className="size-6 rounded-full bg-primary shadow-sm"></div>
        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400">
          {props.author?.name || "Anonymous"}
        </span>
      </div>
    </div>
  );
}
