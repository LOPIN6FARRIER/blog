import type { VideoPost } from "../../types/posts/post";

export default function VideoDetail({ post }: { post: VideoPost }) {
  const getEmbedUrl = () => {
    if (post.video?.embedUrl) return post.video.embedUrl;
    if (post.video?.url) {
      // Convert YouTube URL to embed format
      if (
        post.video.url.includes("youtube.com") ||
        post.video.url.includes("youtu.be")
      ) {
        const videoId = post.video.url.includes("youtube.com")
          ? new URL(post.video.url).searchParams.get("v")
          : post.video.url.split("/").pop();
        return `https://www.youtube.com/embed/${videoId}`;
      }
      // Convert Vimeo URL to embed format
      if (post.video.url.includes("vimeo.com")) {
        const videoId = post.video.url.split("/").pop();
        return `https://player.vimeo.com/video/${videoId}`;
      }
      return post.video.url;
    }
    return "";
  };

  return (
    <article className="max-w-6xl mx-auto">
      {/* Video Player */}
      <div className="aspect-video w-full mb-8 rounded-2xl overflow-hidden shadow-2xl bg-black">
        <iframe
          src={getEmbedUrl()}
          title={post.title}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>

      {/* Title and Info */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              {post.createdAt && (
                <time>{new Date(post.createdAt).toLocaleDateString()}</time>
              )}
              {post.video.duration && (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {post.video.duration}
                </span>
              )}
              {post.video.provider && (
                <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 text-xs font-semibold rounded">
                  {post.video.provider}
                </span>
              )}
            </div>
          </div>

          {/* Watch on Platform Button */}
          {post.video?.url && (
            <a
              href={post.video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shrink-0"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Ver en plataforma
            </a>
          )}
        </div>

        {/* Description */}
        {post.description && (
          <div className="p-6 bg-blue-50 dark:bg-gray-900/50 rounded-xl">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {post.description}
            </p>
          </div>
        )}
      </div>

      {/* Category/Tags */}
      {post.category && (
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm font-semibold rounded-full">
            {post.category}
          </span>
        </div>
      )}
    </article>
  );
}
