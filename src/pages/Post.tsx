import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../Api/usePosts";
import Layout from "../layouts/Layout";
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
  const { fetchPostById } = usePosts({});
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No post ID provided");
      setLoading(false);
      return;
    }

    const loadPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedPost = await fetchPostById(id);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id, fetchPostById]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-zinc-600 dark:text-zinc-400">Loading post...</p>
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
            <p className="text-zinc-600 dark:text-zinc-400">{error}</p>
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
            <p className="text-zinc-600 dark:text-zinc-400">
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
            <p className="text-zinc-600 dark:text-zinc-400">
              Unknown post type: {post.type}
            </p>
          </div>
        );
    }
  };

  return <Layout>{renderPostContent()}</Layout>;
}
