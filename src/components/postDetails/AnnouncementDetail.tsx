import type { AnnouncementPost } from "../../types/posts/post";

export default function AnnouncementDetail({
  post,
}: {
  post: AnnouncementPost;
}) {
  const priorityConfig = {
    low: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      icon: "bg-blue-600 dark:bg-blue-500",
      badge: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
      label: "Información",
    },
    normal: {
      bg: "bg-blue-50 dark:bg-gray-900/50",
      border: "border-blue-200 dark:border-gray-700",
      icon: "bg-zinc-600 dark:bg-zinc-500",
      badge: "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300",
      label: "Normal",
    },
    high: {
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "border-orange-200 dark:border-orange-800",
      icon: "bg-orange-600 dark:bg-orange-500",
      badge:
        "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300",
      label: "Importante",
    },
    urgent: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      icon: "bg-red-600 dark:bg-red-500",
      badge: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300",
      label: "Urgente",
    },
  };

  const config = priorityConfig[post.priority || "normal"];

  return (
    <article className="max-w-4xl mx-auto">
      <div
        className={`p-8 md:p-12 ${config.bg} border-2 ${config.border} rounded-2xl`}
      >
        {/* Icon and Badge */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className={`w-16 h-16 ${config.icon} rounded-xl flex items-center justify-center shrink-0`}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <span
              className={`inline-block px-3 py-1 ${config.badge} text-xs font-semibold rounded-full mb-3`}
            >
              {config.label}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        {post.content && (
          <div className="mb-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="whitespace-pre-line">{post.content}</p>
          </div>
        )}

        {/* Date */}
        {post.createdAt && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Publicado el{" "}
            {new Date(post.createdAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        {/* CTA Button */}
        {post.ctaText && post.ctaUrl && (
          <a
            href={post.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 ${config.icon} text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg`}
          >
            <span>{post.ctaText}</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}
