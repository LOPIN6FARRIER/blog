import type { ThoughtPost } from "../../types/posts/post";

export default function ThoughtCard(props: ThoughtPost) {
  return (
    <div className="col-span-1 rounded-xl p-4 flex flex-col justify-between h-auto aspect-[3/4] {inverted ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-100 dark:bg-zinc-900'}">
      <div className="size-8 rounded-full flex items-center justify-center {inverted ? 'bg-white/20 dark:bg-black/10' : 'bg-black/10 dark:bg-white/20'}">
        <span className="material-symbols-outlined text-sm {inverted ? 'text-white dark:text-black' : 'text-black dark:text-white'}">
          light_mode
        </span>
      </div>
      <p className="text-base font-medium leading-relaxed {inverted ? 'text-white dark:text-black' : 'text-black dark:text-white'}">
        {props.content}
      </p>
      <div className="flex items-center gap-2">
        <div className="size-5 rounded-full bg-primary"></div>
        <span className="text-[10px] uppercase tracking-widest font-bold {inverted ? 'text-white/60 dark:text-black/60' : 'text-black/60 dark:text-white/60'}">
          {props.author?.name || "Anonymous"}
        </span>
      </div>
    </div>
  );
}
