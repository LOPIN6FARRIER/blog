import axios from "axios";
import { useEffect, useState } from "react";
import type { Post, PostsQueryParams } from "../types/posts/post";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3055";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los posts
  const fetchPosts = async (params: PostsQueryParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/posts`, {
        params,
      });
      setPosts(response.data.data);
    } catch (err: unknown) {
      setError("Failed to fetch posts: " + String(err));
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar fetchPosts al montar el componente o cuando cambien los parámetros
  useEffect(() => {
    fetchPosts({});
  }, []);

  // Función para crear un nuevo post
  const createPost = async (newPost: Omit<Post, "id">) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<Post>(`${API_URL}/api/posts`, newPost);
      setPosts((prevPosts) => [...prevPosts, response.data]);
    } catch (err: unknown) {
      setError("Failed to create post: " + String(err));
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, error, fetchPosts, createPost };
};
