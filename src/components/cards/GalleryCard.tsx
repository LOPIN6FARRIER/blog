import type { GalleryPost } from "../../types/posts/post";

export default function GalleryCard({ post }: { post: GalleryPost }) {
  const columnClass = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }[post.columns || 2]; // Predeterminado a 2 columnas si no se especifica

  return (
    <section>
      <div className="flex items-center justify-between pb-4">
        <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-tight">
          {post.title}
        </h3>
        <span className="text-xs font-mono text-gray-400">
          {String(post.images.length).padStart(2, "0")} IMAGES
        </span>
      </div>
      <div className={`grid ${columnClass} gap-2`}>
        {post.images.map((image, index) => (
          <div
            key={index}
            className={`${
              post.layout === "grid"
                ? "rounded-lg border border-gray-100 dark:border-gray-800"
                : "card-border"
            } p-1 bg-white dark:bg-gray-900`}
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded"
              data-alt={image.alt}
              style={{ backgroundImage: `url('${image.url}')` }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
}
