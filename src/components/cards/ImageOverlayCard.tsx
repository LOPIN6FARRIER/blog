import type { PhotoPost } from "../../types/posts/post";

export default function ImageOverlayCard(props: PhotoPost) {
  return (
    <a
      href={"/posts/" + props.id}
      className="masonry-item relative rounded-xl overflow-hidden {aspectClasses[aspectRatio]} group block"
      data-alt={props.image.alt}
      style={{
        backgroundImage: `url(${props.image.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
        <p className="text-white text-sm font-bold leading-tight group-hover:underline">
          {props.title}
        </p>
      </div>
    </a>
  );
}
