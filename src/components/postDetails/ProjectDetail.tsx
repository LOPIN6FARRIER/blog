import type { ProjectPost } from "../../types/posts/post";

export default function ProjectDetail({ post }: { post: ProjectPost }) {
  // Normalize status (API might return 'in-progress' but type expects 'in_progress')
  const normalizedStatus = post.status?.replace("-", "_") as
    | "in_progress"
    | "completed"
    | "archived";

  const statusColors = {
    in_progress:
      "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300",
    completed:
      "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300",
    archived: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400",
  };

  const statusLabels = {
    in_progress: "En Progreso",
    completed: "Completado",
    archived: "Archivado",
  };

  return (
    <article className="max-w-5xl mx-auto">
      {/* Hero Image */}
      {post.coverImage && (
        <div className="w-full aspect-[16/9] mb-8 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {normalizedStatus && (
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColors[normalizedStatus]}`}
            >
              {statusLabels[normalizedStatus]}
            </span>
          )}
          {post.year && (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {post.year}
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
          {post.title}
        </h1>

        {post.description && (
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            {post.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          {post.role && (
            <div>
              <span className="font-semibold">Rol:</span> {post.role}
            </div>
          )}
          {post.client && (
            <div>
              <span className="font-semibold">Cliente:</span> {post.client}
            </div>
          )}
        </div>
      </div>

      {/* Tech Stack */}
      {post.technologies && post.technologies.length > 0 && (
        <div className="mb-8 p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Tecnologías Utilizadas
          </h2>
          <div className="flex flex-wrap gap-2">
            {post.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm font-medium rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Content/Description */}
      {post.content && (
        <div className="mb-8 prose prose-lg dark:prose-invert max-w-none">
          <div
            className="text-zinc-700 dark:text-zinc-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-4">
        {post.liveUrl && (
          <a
            href={post.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Ver Demo en Vivo
          </a>
        )}
        {post.repoUrl && (
          <a
            href={post.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Ver Código
          </a>
        )}
      </div>
    </article>
  );
}
