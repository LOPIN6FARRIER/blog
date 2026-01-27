import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "../services/authClient";
import type { AboutMeProps } from "../types/AboutMe/AboutMe";

const API_URL = import.meta.env.VITE_API || "http://localhost:3055";

interface AboutMeUpdateData {
  name: string;
  title: string;
  location: string;
  bio: string;
  email: string;
  image: string;
  quote?: string;
  skills?: string[];
  interests?: string[];
  socials?: Array<{
    icon: string;
    href: string;
    label: string;
  }>;
}

export function useAboutMe() {
  return useQuery<AboutMeProps>({
    queryKey: ["aboutMe"],
    queryFn: async () => {
      const res = await fetchWithAuth(`${API_URL}/api/about-me`, {
        method: "GET",
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to fetch about me data");
      }

      const data = res.data.data;
      return {
        name: data.name,
        title: data.title,
        location: data.location,
        bio: data.bio,
        email: data.email,
        image: data.image,
        quote: data.quote || "",
        skills: data.skills,
        interests: data.interests,
        socials: data.socials,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function useUpdateAboutMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AboutMeUpdateData) => {
      const res = await fetchWithAuth(`${API_URL}/api/about-me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to update about me");
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutMe"] });
    },
  });
}

export function useAddSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (skill: string) => {
      const res = await fetchWithAuth(`${API_URL}/api/about-me/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { skill },
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to add skill");
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutMe"] });
    },
  });
}

export function useRemoveSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (skill: string) => {
      const res = await fetchWithAuth(
        `${API_URL}/api/about-me/skills/${encodeURIComponent(skill)}`,
        {
          method: "DELETE",
        },
      );

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to remove skill");
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutMe"] });
    },
  });
}

export function useAddInterest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (interest: string) => {
      const res = await fetchWithAuth(`${API_URL}/api/about-me/interests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { interest },
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to add interest");
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutMe"] });
    },
  });
}

export function useRemoveInterest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (interest: string) => {
      const res = await fetchWithAuth(
        `${API_URL}/api/about-me/interests/${encodeURIComponent(interest)}`,
        {
          method: "DELETE",
        },
      );

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to remove interest");
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutMe"] });
    },
  });
}

export function useAddSocial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { icon: string; href: string; label: string }) => {
      const res = await fetchWithAuth(`${API_URL}/api/about-me/socials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to add social");
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutMe"] });
    },
  });
}

export function useRemoveSocial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (label: string) => {
      const res = await fetchWithAuth(
        `${API_URL}/api/about-me/socials/${encodeURIComponent(label)}`,
        {
          method: "DELETE",
        },
      );

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to remove social");
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutMe"] });
    },
  });
}
