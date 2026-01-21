import type { ProjectPost } from "../../types/posts/post";

export default function ProjectCard(props: ProjectPost) {
  const formatUrl = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div className="px-4 mb-6">
      <div
        className="relative bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl overflow-hidden min-h-105 shadow-sm hover:shadow-xl transition-shadow"
        data-alt={props.coverImage?.alt || "Hero Image"}
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 60%), url('${props.coverImage?.url}')`,
        }}
      >
        <a
          href={`/posts/${props.id}`}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-sm"
          title="Ver detalles"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            className="fill-zinc-700"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
          </svg>
        </a>
        <div className="p-6">
          {props.status && (
            <span className="inline-block px-2 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded mb-3">
              {props.status === "completed"
                ? "Completed"
                : props.status === "in-progress"
                  ? "In Progress"
                  : "Archived"}
            </span>
          )}
          <h2 className="text-white text-3xl font-bold leading-tight mb-2">
            {props.title}
          </h2>
          {props.description && (
            <p className="text-white/90 text-base font-normal mb-4">
              {props.description}
            </p>
          )}
          {props.technologies && props.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {props.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          {props.role && (
            <p className="text-white/80 text-sm font-medium mb-2">
              Role: {props.role}
            </p>
          )}
          {props.client && (
            <p className="text-white/80 text-sm font-medium mb-2">
              Client: {props.client}
            </p>
          )}
          {props.year && (
            <p className="text-white/80 text-sm font-medium mb-2">
              Year: {props.year}
            </p>
          )}
          <div className="flex gap-4 mt-4">
            {props.liveUrl && (
              <a
                href={formatUrl(props.liveUrl)}
                className="inline-block bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
            )}
            {props.repoUrl && (
              <a
                href={props.repoUrl}
                className="inline-block bg-secondary text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
