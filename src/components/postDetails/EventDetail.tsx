import type { EventPost } from "../../types/posts/post";

export default function EventDetail({ post }: { post: EventPost }) {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: string | Date) => {
    return new Date(date).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <article className="max-w-5xl mx-auto">
      {/* Hero */}
      {post.coverImage && (
        <div className="w-full aspect-[21/9] mb-8 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {post.description}
          </p>
        )}
      </div>

      {/* Event Details */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Date & Time */}
        {post.startDate && (
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                  Fecha y Hora
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {formatDate(post.startDate)}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {formatTime(post.startDate)}
                  {post.endDate && ` - ${formatTime(post.endDate)}`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Location */}
        {post.location && post.location.name && (
          <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-600 dark:bg-purple-500 rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                  Ubicación
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {post.location.name}
                </p>
                {post.location.address && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {post.location.address}
                  </p>
                )}
                {post.location.url && (
                  <a
                    href={post.location.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 dark:text-purple-400 text-sm hover:underline mt-1 inline-block"
                  >
                    Ver en mapa
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Price */}
        {post.price && (
          <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-600 dark:bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                  Precio
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
                  {post.price}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Capacity */}
        {post.capacity && (
          <div className="p-6 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-600 dark:bg-orange-500 rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                  Capacidad
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
                  {post.capacity} personas
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      {post.content && (
        <div className="mb-8 prose prose-lg dark:prose-invert max-w-none">
          <div
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      )}

      {/* Registration Button */}
      {post.registrationUrl && (
        <div className="flex justify-center">
          <a
            href={post.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg font-semibold transition-colors shadow-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            Registrarse al Evento
          </a>
        </div>
      )}
    </article>
  );
}
