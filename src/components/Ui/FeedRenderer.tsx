import React from "react";

import type { FeedItem } from "../../types/posts/post";
import ArticleCard from "../cards/ArticleCard";
import CompactLinkCard from "../cards/CompactLinkCard";
import ContentCard from "../cards/ContentCard";
import GalleryCard from "../cards/GalleryCard";
import HeroCard from "../cards/HeroCard";
import MediaPlayer from "../cards/MediaPlayer";
import PhotoCard from "../cards/PhotoCard";
import QuoteCard from "../cards/QuoteCard";
import ThoughtCard from "../cards/ThoughtCard";
import VerticalPhotoCard from "../cards/VerticalPothoCard";
import ImageOverlayCard from "../cards/ImageOverlayCard";

interface FeedRendererProps {
  item: FeedItem;
}

const FeedRenderer: React.FC<FeedRendererProps> = ({ item }) => {
  const { post, size = "medium" } = item;

  // Determina las clases de span basado en el tamaño
  const getSpanClass = (size: string): string => {
    switch (size) {
      case "full":
      case "large":
        return "col-span-2";
      case "small":
      default:
        return "col-span-1";
    }
  };

  const spanClass = getSpanClass(size);

  return (
    <div className={spanClass}>
      {post.type === "article" && (
        <>
          {size === "full" || size === "large" ? (
            post.featured ? (
              <HeroCard
                imageUrl={post.coverImage?.url || ""}
                alt={post.coverImage?.alt || ""}
                title={post.title}
                description={post.excerpt}
                badge={post.category}
                href={`/blog/${post.slug}`}
              />
            ) : (
              <ContentCard
                imageUrl={post.coverImage?.url || ""}
                alt={post.coverImage?.alt || ""}
                title={post.title}
                category={post.category || ""}
                description={post.excerpt}
                timeAgo={post.readTime}
              />
            )
          ) : (
            <ArticleCard {...post} />
          )}
        </>
      )}

      {post.type === "photo" && (
        <>
          {size === "full" || size === "large" ? (
            <PhotoCard {...post} />
          ) : (
            <VerticalPhotoCard {...post} />
          )}
        </>
      )}

      {post.type === "gallery" && <GalleryCard post={post} />}

      {post.type === "thought" && (
        <>
          {post.style === "quote" || post.source ? (
            <QuoteCard
              quote={post.content}
              author={post.source || post.author?.name || ""}
            />
          ) : (
            <ThoughtCard {...post} />
          )}
        </>
      )}

      {post.type === "music" && (
        <MediaPlayer
          post={post}
          isPlaying={false} // Puedes manejar el estado de reproducción desde un estado superior
          currentTime="0:00"
          duration={post.audio.duration || "0:00"}
          progress={0} // Puedes manejar el progreso desde un estado superior
          onTogglePlay={() => {
            console.log("Toggle play for", post.audio.title);
          }}
        />
      )}

      {post.type === "project" && (
        <>
          {size === "full" ? (
            <HeroCard
              imageUrl={post.coverImage?.url || ""}
              alt={post.coverImage?.alt || ""}
              title={post.title}
              description={post.description}
              badge={post.status === "completed" ? "Completed" : "In Progress"}
              buttonText="View Project"
              href={post.liveUrl || `/projects/${post.slug}`}
            />
          ) : (
            <ContentCard
              imageUrl={post.coverImage?.url || ""}
              alt={post.coverImage?.alt || ""}
              title={post.title}
              category="Project"
              description={post.description}
            />
          )}
        </>
      )}

      {post.type === "announcement" && (
        <HeroCard
          imageUrl=""
          title={post.title}
          description={post.content}
          badge={post.priority === "urgent" ? "Urgent" : "Announcement"}
          buttonText={post.ctaText || "Learn More"}
          href={post.ctaUrl || "#"}
        />
      )}

      {post.type === "link" && <CompactLinkCard post={post} />}

      {post.type === "video" && (
        <>
          {size === "full" || size === "large" ? (
            <HeroCard
              imageUrl={post.video?.thumbnail || ""}
              alt={post.title}
              title={post.title}
              description={post.description}
              badge={post.category}
              buttonText="Watch"
              href={post.video?.embedUrl || post.video?.url || "#"}
            />
          ) : (
            <ImageOverlayCard
              id={post.id}
              type="photo"
              slug={post.slug}
              createdAt={post.createdAt}
              title={post.title}
              image={{ url: post.video?.thumbnail || "", alt: post.title }}
            />
          )}
        </>
      )}

      {post.type === "event" && (
        <>
          {size === "full" ? (
            <HeroCard
              imageUrl={post.coverImage?.url || ""}
              alt={post.coverImage?.alt || ""}
              title={post.title}
              description={post.description}
              badge={
                post.startDate
                  ? new Date(post.startDate).toLocaleDateString()
                  : "Event"
              }
              buttonText="View Event"
              href={post.registrationUrl || "#"}
            />
          ) : (
            <ContentCard
              imageUrl={post.coverImage?.url || ""}
              alt={post.coverImage?.alt || ""}
              title={post.title}
              category={post.category || "Event"}
              description={post.description}
            />
          )}
        </>
      )}

      {/* Fallback para tipos no soportados */}
      {![
        "article",
        "photo",
        "gallery",
        "thought",
        "music",
        "project",
        "announcement",
        "link",
        "video",
        "event",
      ].includes(post.type) && (
        <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4">
          <p className="text-sm text-zinc-500">Unsupported post type:</p>
        </div>
      )}
    </div>
  );
};

export default FeedRenderer;
