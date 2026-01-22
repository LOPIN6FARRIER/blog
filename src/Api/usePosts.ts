import { fetchWithAuth } from "../services/authClient";
import { useCallback, useEffect, useState } from "react";
import type { Post, PostsQueryParams } from "../types/posts/post";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3055";

export const usePosts = (params?: PostsQueryParams) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(20);

  const [totalItems, setTotalItems] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  /**
   * Fetch posts
   */
  const fetchPosts = useCallback(
    async (queryParams: PostsQueryParams, shouldAppend = false) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchWithAuth(`${API_URL}/api/posts`, {
          method: "GET",
          params: {
            ...queryParams,
            page,
            limit,
          },
        });

        const data = response.data;

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch posts");
        }

        setPosts((prev) =>
          shouldAppend ? [...prev, ...data.data] : data.data,
        );

        setTotalItems(data.totalItems);
        setHasMore(data.hasMorePages);
      } catch (err: unknown) {
        setError("Failed to fetch posts: " + String(err));
      } finally {
        setLoading(false);
      }
    },
    [page, limit],
  );

  /**
   * Reset cuando cambian filtros
   */
  const resetPosts = useCallback(() => {
    setPosts([]);
    setTotalItems(0);
    setPage(1);
    setHasMore(true);
  }, []);

  /**
   * Cambian filtros → reset + page 1
   */
  useEffect(() => {
    if (!params) return;

    resetPosts();

    fetchPosts(
      {
        ...params,
        page: 1,
        limit,
      },
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params?.type,
    params?.status,
    params?.category,
    params?.tag,
    params?.q,
    limit,
  ]);

  /**
   * Load more
   */
  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;

    const nextPage = page + 1;
    setPage(nextPage);

    await fetchPosts(
      {
        ...params,
        page: nextPage,
        limit,
      },
      true,
    );
  }, [page, limit, hasMore, loading, params, fetchPosts]);

  // Función para crear un nuevo post
  const createPost = async (newPost: Omit<Post, "id">) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchWithAuth(`${API_URL}/api/posts`, {
        method: "POST",
        data: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.data;
      if (data.success) {
        setPosts((prevPosts) => [...prevPosts, data.data]);
        return data.data;
      }
      throw new Error("Failed to create post");
    } catch (err: unknown) {
      setError("Failed to create post: " + String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para crear un post de música desde URL de Spotify
  const createMusicPostFromSpotify = async (data: {
    url: string;
    title?: string;
    tags?: string[];
    category?: string;
    status?: "draft" | "published";
    market?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchWithAuth(
        `${API_URL}/api/posts/from-spotify`,
        {
          method: "POST",
          data: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const result = await response.data;
      if (result.success) {
        setPosts((prevPosts) => [...prevPosts, result.data]);
        return result.data;
      }
      throw new Error(
        result.message || "Failed to create music post from Spotify",
      );
    } catch (err: unknown) {
      setError("Failed to create music post from Spotify: " + String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para subir una imagen a un post
  const uploadPostImage = async (postId: string, file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetchWithAuth(
        `${API_URL}/api/posts/${postId}/image`,
        {
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (err: unknown) {
      throw new Error("Failed to upload image: " + String(err));
    }
  };

  // Función para subir múltiples imágenes a un post
  const uploadPostImages = async (postId: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetchWithAuth(
        `${API_URL}/api/posts/${postId}/images`,
        {
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (err: unknown) {
      throw new Error("Failed to upload images: " + String(err));
    }
  };
  // Función para obtener un post por ID
  const fetchPostById = useCallback(
    async (postId: string): Promise<Post | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchWithAuth(`${API_URL}/api/posts/${postId}`, {
          method: "GET",
        });

        const data = response.data;

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch post");
        }

        return data.data;
      } catch (err: unknown) {
        setError("Failed to fetch post: " + String(err));
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Función para actualizar un post
  const updatePost = async (postId: string, updates: Partial<Post>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchWithAuth(`${API_URL}/api/posts/${postId}`, {
        method: "PUT",
        data: JSON.stringify(updates),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.data;
      if (data.success) {
        // Actualizar el post en el estado local
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, ...data.data } : post,
          ),
        );
        return data.data;
      }
      throw new Error("Failed to update post");
    } catch (err: unknown) {
      setError("Failed to update post: " + String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un post
  const deletePost = async (postId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchWithAuth(`${API_URL}/api/posts/${postId}`, {
        method: "DELETE",
      });
      const data = await response.data;
      if (data.success) {
        // Eliminar el post del estado local
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        return true;
      }
      throw new Error("Failed to delete post");
    } catch (err: unknown) {
      setError("Failed to delete post: " + String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    error,
    totalItems,
    hasMore,
    loadMore,
    resetPosts,
    fetchPosts,
    fetchPostById,
    createPost,
    createMusicPostFromSpotify,
    updatePost,
    deletePost,
    uploadPostImage,
    uploadPostImages,
  };
};
