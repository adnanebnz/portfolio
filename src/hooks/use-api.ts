"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types
interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleFr: string;
  summaryEn: string | null;
  summaryFr: string | null;
  contentEn: string;
  contentFr: string;
  coverImage: string | null;
  published: boolean;
  publishedAt: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface WorkExperience {
  id: string;
  company: string;
  href: string | null;
  logoUrl: string | null;
  location: string;
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  order: number;
  badges: string[];
}

interface Project {
  id: string;
  slug: string;
  titleEn: string;
  titleFr: string;
  subtitleEn: string | null;
  subtitleFr: string | null;
  descriptionEn: string;
  descriptionFr: string;
  dates: string | null;
  active: boolean;
  featured: boolean;
  order: number;
  posterImage: string | null;
  mobileAppImages: string[];
  webAppImages: string[];
  technologies: string[];
}

// Blog Posts Hooks
export function useBlogPosts(options?: {
  published?: boolean;
  limit?: number;
}) {
  const params = new URLSearchParams();
  if (options?.published !== undefined) {
    params.set("published", String(options.published));
  }
  if (options?.limit) {
    params.set("limit", String(options.limit));
  }
  const queryString = params.toString();
  const url = `/api/blog${queryString ? `?${queryString}` : ""}`;

  return useQuery<BlogPost[]>({
    queryKey: ["blog-posts", options],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      return response.json();
    },
  });
}

export function useBlogPost(slugOrId: string) {
  return useQuery<BlogPost>({
    queryKey: ["blog-post", slugOrId],
    queryFn: async () => {
      const response = await fetch(`/api/blog/${slugOrId}`);
      if (!response.ok) throw new Error("Failed to fetch blog post");
      return response.json();
    },
    enabled: !!slugOrId,
  });
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<BlogPost>) => {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create blog post");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string } & Partial<BlogPost>) => {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update blog post");
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-post", data.id] });
      queryClient.invalidateQueries({ queryKey: ["blog-post", data.slug] });
    },
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete blog post");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });
}

// Work Experience Hooks
export function useWorkExperiences() {
  return useQuery<WorkExperience[]>({
    queryKey: ["work-experiences"],
    queryFn: async () => {
      const response = await fetch("/api/work");
      if (!response.ok) throw new Error("Failed to fetch work experiences");
      return response.json();
    },
  });
}

export function useCreateWorkExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<WorkExperience>) => {
      const response = await fetch("/api/work", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create work experience");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-experiences"] });
    },
  });
}

export function useUpdateWorkExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: { id: string } & Partial<WorkExperience>) => {
      const response = await fetch(`/api/work/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update work experience");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-experiences"] });
    },
  });
}

export function useDeleteWorkExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/work/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete work experience");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-experiences"] });
    },
  });
}

// Projects Hooks
export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch("/api/projects-db");
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    },
  });
}

export function useProject(slugOrId: string) {
  return useQuery<Project>({
    queryKey: ["project", slugOrId],
    queryFn: async () => {
      const response = await fetch(`/api/projects-db/${slugOrId}`);
      if (!response.ok) throw new Error("Failed to fetch project");
      return response.json();
    },
    enabled: !!slugOrId,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Project>) => {
      const response = await fetch("/api/projects-db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create project");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string } & Partial<Project>) => {
      const response = await fetch(`/api/projects-db/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update project");
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", data.id] });
      queryClient.invalidateQueries({ queryKey: ["project", data.slug] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/projects-db/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete project");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
