import type { ArticlePost } from "../../types/posts/post";
export default function ArticleCard(props: ArticlePost) {
  return (
    <a
      href={`/posts/${props.id}`}
      className="masonry-item bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm block hover:shadow-md transition-shadow"
    >
      <div
        className="w-full aspect-[4/5] bg-cover bg-center"
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
            <span className="text-[10px] text-gray-400">{props.readTime}</span>
            <span className="material-symbols-outlined text-gray-300 text-lg">
              bookmark
            </span>
          </div>
        )}
      </div>
    </a>
  );
}
