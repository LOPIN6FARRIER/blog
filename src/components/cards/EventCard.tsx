import { Link } from "react-router-dom";
import type { EventPost } from "../../types/posts/post";
import OptimizedImage from "../Ui/OptimizedImage";

export default function EventCard(props: EventPost) {
  return (
    <div className="px-4 mb-6">
      {props.coverImage?.url && (
        <OptimizedImage
          src={props.coverImage.url}
          thumbnail={props.coverImage?.thumbnails?.large}
          alt={props.coverImage?.alt || "Hero Image"}
          className="relative flex flex-col items-stretch justify-end rounded-xl overflow-hidden min-h-105 shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
          overlay="linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 60%)"
          loading="lazy"
        >
        <Link
          to={`/posts/${props.id}`}
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
        </Link>
        <div className="p-6">
          <h2 className="text-white text-3xl font-bold leading-tight mb-2">
            {props.title}
          </h2>
          {props.description && (
            <p className="text-white/90 text-base font-normal mb-4">
              {props.description}
            </p>
          )}
          {props.startDate && (
            <p className="text-white/80 text-sm font-medium mb-2">
              Fecha: {new Date(props.startDate).toLocaleDateString()}
              {props.endDate &&
                ` - ${new Date(props.endDate).toLocaleDateString()}`}
            </p>
          )}
          {props.location && (
            <p className="text-white/80 text-sm font-medium mb-2">
              Lugar: {props.location.name}
              {props.location.address && `, ${props.location.address}`}
            </p>
          )}
          {props.registrationUrl && (
            <a
              href={props.registrationUrl}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg hover:bg-secondary/90 transition-colors"
            >
              Registrarse
            </a>
          )}
        </div>
      </OptimizedImage>
      )}
    </div>
  );
}
