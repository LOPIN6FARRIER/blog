import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchWithAuth } from "../services/authClient";
import type {
  Post,
  PostsQueryParams,
  PostsResponse,
} from "../types/posts/post";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3055";

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
  const queryClient = useQueryClient();

  /* CREATE POST */
  const createPost = useMutation({
    mutationFn: async (newPost: Omit<Post, "id">) => {
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
    },
  });

  /* DELETE POST */
  const deletePost = useMutation({
    mutationFn: async (postId: string) => {
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
    },
  });

  return {
    createPost,
    updatePost,
    deletePost,
    createMusicPostFromSpotify,
  };
}
