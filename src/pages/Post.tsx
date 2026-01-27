import React from "react";
import { useParams } from "react-router-dom";
import { usePostById } from "../Api/usePosts";
import Layout from "../layouts/Layout";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";
import type { Post } from "../types/posts/post";

// Import all detail components
import ArticleDetail from "../components/postDetails/ArticleDetail";
import PhotoDetail from "../components/postDetails/PhotoDetail";
import GalleryDetail from "../components/postDetails/GalleryDetail";
import ThoughtDetail from "../components/postDetails/ThoughtDetail";
import MusicDetail from "../components/postDetails/MusicDetail";
import VideoDetail from "../components/postDetails/VideoDetail";
import ProjectDetail from "../components/postDetails/ProjectDetail";
import LinkDetail from "../components/postDetails/LinkDetail";
import EventDetail from "../components/postDetails/EventDetail";
import AnnouncementDetail from "../components/postDetails/AnnouncementDetail";
import RecommendationDetail from "../components/postDetails/RecommendationDetail";
import RatingDetail from "../components/postDetails/RatingDetail";
import RankingDetail from "../components/postDetails/RankingDetail";

export default function Post() {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error } = usePostById(id);

  // Helper function to get post description
  const getPostDescription = (post: Post): string => {
    if (post.type === "article") return post.excerpt || "";
    if (post.type === "project") return post.description || "";
    if (post.type === "thought") return post.content?.substring(0, 160) || "";
    if (post.type === "video") return post.description || "";
    if (post.type === "music") return post.description || "";
    if (post.type === "event") return post.description || "";
    if (post.type === "link") return post.description || "";
    if (post.type === "announcement") return post.content || "";
    return post.title;
  };

  // Helper function to get post image
  const getPostImage = (post: Post): string => {
    if (post.type === "article" && post.coverImage?.url)
      return post.coverImage.url;
    if (post.type === "project" && post.coverImage?.url)
      return post.coverImage.url;
    if (post.type === "photo" && post.imageUrl) return post.imageUrl;
    if (post.type === "video" && post.thumbnailUrl) return post.thumbnailUrl;
    if (post.type === "music" && post.audio?.coverUrl)
      return post.audio.coverUrl;
    if (post.type === "event" && post.coverImage?.url)
      return post.coverImage.url;
    if (post.type === "gallery" && post.images?.[0]?.url)
      return post.images[0].url;
    return "/icono.png";
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading post...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              Oops!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Error loading post
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              Post not found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The post you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const renderPostContent = () => {
    switch (post.type) {
      case "article":
        return <ArticleDetail post={post} />;
      case "photo":
        return <PhotoDetail post={post} />;
      case "gallery":
        return <GalleryDetail post={post} />;
      case "thought":
        return <ThoughtDetail post={post} />;
      case "music":
        return <MusicDetail post={post} />;
      case "video":
        return <VideoDetail post={post} />;
      case "project":
        return <ProjectDetail post={post} />;
      case "link":
        return <LinkDetail post={post} />;
      case "event":
        return <EventDetail post={post} />;
      case "announcement":
        return <AnnouncementDetail post={post} />;
      case "recommendation":
        return <RecommendationDetail post={post} />;
      case "rating":
        return <RatingDetail post={post} />;
      case "ranking":
        return <RankingDetail post={post} />;
      default:
        return (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400">
              Unknown post type: {post.type}
            </p>
          </div>
        );
    }
  };

  return (
    <Layout>
      <SEO
        title={post.title}
        description={getPostDescription(post)}
        image={getPostImage(post)}
        url={`https://vinicioesparza.dev/post/${post.slug}`}
        type="article"
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        keywords={post.tags?.join(", ")}
      />
      {(post.type === "article" || post.type === "project") && (
        <StructuredData
          type={post.type === "article" ? "BlogPosting" : "Article"}
          data={{
            headline: post.title,
            image: getPostImage(post),
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            description: getPostDescription(post),
            keywords: post.tags?.join(", "),
            articleSection: post.category || post.type,
            articleBody: getPostDescription(post),
          }}
        />
      )}
      {renderPostContent()}
    </Layout>
  );
}
