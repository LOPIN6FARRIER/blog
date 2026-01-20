import type { HeroCardPost } from "../../types/posts/post";

export default function HeroCard(props: HeroCardPost) {
  return (
    <div className="px-4 mb-6">
      <div
        className="relative bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl overflow-hidden min-h-105 shadow-sm"
        data-alt={props.alt}
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 60%), url('${props.imageUrl}')`,
        }}
      >
        <div className="p-6">
          {props.badge && (
            <span className="inline-block px-2 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded mb-3">
              {props.badge}
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
          <a
            href={props.href}
            className="inline-block bg-white text-black px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg"
          >
            {props.buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}
