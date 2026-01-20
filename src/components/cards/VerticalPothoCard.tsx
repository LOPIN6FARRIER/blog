import type { PhotoPost } from "../../types/posts/post";

export default function VerticalPhotoCard(props: PhotoPost) {
  return (
    <div className="col-span-1 rounded-xl overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800">
      <div
        className="aspect-3/4 bg-cover bg-center"
        data-alt={props.image.alt}
        style={{ backgroundImage: `url(${props.image.url})` }}
      ></div>
      <div className="p-3">
        <p className="text-[#111418] dark:text-white text-sm font-bold leading-tight">
          {props.title}
        </p>
        <p className="text-[#617589] dark:text-zinc-500 text-[10px] uppercase font-bold mt-1">
          {props.category}
        </p>
      </div>
    </div>
  );
}
