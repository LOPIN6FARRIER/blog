import type { PhotoPost } from "../../types/posts/post";

export default function PhotoCard(props: PhotoPost) {
  return (
    <div className="{fullWidth ? 'col-span-2' : 'col-span-1'} rounded-xl overflow-hidden bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div
        className="relative aspect-[16/10] bg-cover bg-center"
        data-alt={props.image.alt}
        style={{ backgroundImage: `url(${props.image.url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5">
          <span className="text-white/80 text-[10px] uppercase tracking-widest font-bold mb-1">
            {props.category}
          </span>
          <h2 className="text-white text-2xl font-bold leading-none tracking-tight">
            {props.title}
          </h2>
        </div>
      </div>
    </div>
  );
}
