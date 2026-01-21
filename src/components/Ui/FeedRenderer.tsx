import React from "react";

import type { FeedItem } from "../../types/posts/post";
import AnnouncementCard from "../cards/AnnouncementCard";
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
import YouTubeLinkCard from "../cards/YouTubeLinkCard";
import VideoCard from "../cards/VideoCard";
import ProjectCard from "../cards/ProjectCard";
import EventCard from "../cards/EventCard";
import { RecommendationCard } from "../cards/RecommendationCard";
import { RankingCard } from "../cards/RankingCard";
import { RatingCard } from "../cards/RatingCard";
import { RecommendationCompactCard } from "../cards/RecommendationCompactCard";

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
              <HeroCard {...post} />
            ) : (
              <ContentCard {...post} />
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
          <ProjectCard {...post} />
        </>
      )}

      {post.type === "announcement" && (
        <AnnouncementCard
          title={post.title}
          content={post.content}
          priority={post.priority}
          ctaText={post.ctaText}
          ctaUrl={post.ctaUrl}
          expiresAt={post.expiresAt}
          type={post.type}
          id={post.id}
          slug={post.slug}
          createdAt={post.createdAt}
        />
      )}

      {post.type === "link" && <CompactLinkCard post={post} />}

      {post.type === "video" && (
        <>
          {size === "full" || size === "large" ? (
            <VideoCard {...post} />
          ) : (
            <YouTubeLinkCard post={post} />
          )}
        </>
      )}

      {post.type === "event" && (
        <>
          <EventCard {...post} />
        </>
      )}

      {post.type === "recommendation" && post.compact !== true && (
        <RecommendationCard post={post} />
      )}

      {post.type === "recommendation" && post.compact === true && (
        <RecommendationCompactCard post={post} />
      )}

      {post.type === "ranking" && <RankingCard post={post} />}

      {post.type === "rating" && <RatingCard post={post} />}

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
        "recommendation",
        "ranking",
        "rating",
      ].includes(post.type) && (
        <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4">
          <p className="text-sm text-zinc-500">Unsupported post type:</p>
        </div>
      )}
    </div>
  );
};

export default FeedRenderer;
