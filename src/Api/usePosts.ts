import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchWithAuth } from "../services/authClient";
import type {
  Post,
  PostsQueryParams,
  PostsResponse,
} from "../types/posts/post";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API || "http://localhost:3055";

/* =========================
   QUERY: LISTADO DE POSTS
========================= */
export function usePosts(params: PostsQueryParams = {}) {
  const { type, status, category, tag, q, limit = 20 } = params;

  // Retornar directamente useInfiniteQuery (más estándar)
  return useInfiniteQuery<PostsResponse>({
    queryKey: ["posts", type, status, category, tag, q, limit],

    queryFn: async ({ pageParam }) => {
      const page = (pageParam as number) ?? 1;

      const res = await fetchWithAuth(`${API_URL}/api/posts`, {
        method: "GET",
        params: {
          type,
          status,
          category,
          tag,
          q,
          limit,
          page,
        },
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to fetch posts");
      }

      return res.data;
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.hasMorePages ? lastPage.currentPage + 1 : undefined,

    staleTime: 5 * 60 * 1000, // 5 minutos - datos considerados frescos
    gcTime: 10 * 60 * 1000, // 10 minutos en memoria
    refetchOnMount: false, // NO refetch al remontar componente
    refetchOnWindowFocus: false, // NO refetch al cambiar foco
  });
}

/* =========================
   MUTATIONS
========================= */
export function usePostMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const invalidatePosts = () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    setLoading(false);
  };

  /* CREATE POST */
  const createPost = useMutation({
    mutationFn: async (newPost: Omit<Post, "id">) => {
      setLoading(true);
      const res = await fetchWithAuth(`${API_URL}/api/posts`, {
        method: "POST",
        data: JSON.stringify(newPost),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.data?.success) {
        throw new Error("Failed to create post");
      }

      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      setLoading(false);
    },
    onError: (error: unknown) => {
      setError(
        error instanceof Error ? error.message : "Failed to create post",
      );
      setLoading(false);
    },
  });

  /* UPDATE POST */
  const updatePost = useMutation({
    mutationFn: async ({
      postId,
      updates,
    }: {
      postId: string;
      updates: Partial<Post>;
    }) => {
      setLoading(true);
      const res = await fetchWithAuth(`${API_URL}/api/posts/${postId}`, {
        method: "PUT",
        data: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.data?.success) {
        throw new Error("Failed to update post");
      }

      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setLoading(false);
    },
    onError: (error: unknown) => {
      setError(
        error instanceof Error ? error.message : "Failed to update post",
      );
      setLoading(false);
    },
  });

  /* DELETE POST */
  const deletePost = useMutation({
    mutationFn: async (postId: string) => {
      setLoading(true);
      const res = await fetchWithAuth(`${API_URL}/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!res.data?.success) {
        throw new Error("Failed to delete post");
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setLoading(false);
    },
    onError: (error: unknown) => {
      setError(
        error instanceof Error ? error.message : "Failed to delete post",
      );
      setLoading(false);
    },
  });

  /* CREATE MUSIC FROM SPOTIFY */
  const createMusicPostFromSpotify = useMutation({
    mutationFn: async (data: {
      url: string;
      title?: string;
      tags?: string[];
      category?: string;
      status?: "draft" | "published";
      market?: string;
    }) => {
      setLoading(true);
      const res = await fetchWithAuth(`${API_URL}/api/posts/from-spotify`, {
        method: "POST",
        data: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message);
      }

      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setLoading(false);
    },
    onError: (error: unknown) => {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create music post from Spotify",
      );
      setLoading(false);
    },
  });
  /* UPLOAD SINGLE IMAGE */
  const uploadPostImage = useMutation({
    mutationFn: async ({ postId, file }: { postId: string; file: File }) => {
      const formData = new FormData();
      formData.append("image", file);

      setLoading(true);
      const res = await fetchWithAuth(`${API_URL}/api/posts/${postId}/image`, {
        method: "POST",
        data: formData,
      });

      if (!res.data?.success) {
        throw new Error("Failed to upload image");
      }

      return res.data.data;
    },
    onSuccess: invalidatePosts,
    onError: (error: unknown) => {
      setError(
        error instanceof Error ? error.message : "Failed to upload image",
      );
      setLoading(false);
    },
  });

  /* UPLOAD MULTIPLE IMAGES */
  const uploadPostImages = useMutation({
    mutationFn: async ({
      postId,
      files,
    }: {
      postId: string;
      files: File[];
    }) => {
      const formData = new FormData();
      files.forEach((f) => formData.append("images", f));

      const res = await fetchWithAuth(`${API_URL}/api/posts/${postId}/images`, {
        method: "POST",
        data: formData,
      });

      if (!res.data?.success) {
        throw new Error("Failed to upload images");
      }

      return res.data.data;
    },
    onSuccess: invalidatePosts,
    onError: (error: unknown) => {
      setError(
        error instanceof Error ? error.message : "Failed to upload images",
      );
      setLoading(false);
    },
  });

  return {
    createPost,
    updatePost,
    deletePost,
    createMusicPostFromSpotify,
    uploadPostImage,
    uploadPostImages,
    loading,
    error,
  };
}

export function usePostById(postId?: string) {
  return useQuery<Post>({
    queryKey: ["post", postId],
    enabled: !!postId, // 🔑 solo ejecuta si hay id
    queryFn: async () => {
      const res = await fetchWithAuth(`${API_URL}/api/posts/${postId}`, {
        method: "GET",
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Post not found");
      }

      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
