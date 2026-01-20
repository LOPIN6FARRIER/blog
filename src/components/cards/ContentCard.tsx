import type { ContentPost } from "../../types/posts/post";

export default function ContentCard(props: ContentPost) {
  return (
    <div className="col-span-2 p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col @container">
      <div className="flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start">
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
          data-alt={props.alt}
          style={{ backgroundImage: `url('${props.imageUrl}')` }}
        ></div>
        <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
          <p className="text-[#111418] dark:text-white text-xl font-bold leading-tight tracking-tight">
            {props.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">
              {props.category}
            </span>
            {props.timeAgo && (
              <>
                <span className="size-1 rounded-full bg-zinc-300"></span>
                <span className="text-[#617589] dark:text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                  {props.timeAgo}
                </span>
              </>
            )}
          </div>
          {props.description && (
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2 line-clamp-2 font-medium">
              {props.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
