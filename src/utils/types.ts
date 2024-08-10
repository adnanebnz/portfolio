import { ReactNode } from "react";

export type Response<T> = {
  data: T | null;
  error: string | null;
};

export type linkType = {
  type: string;
  href: string;
  icon: ReactNode;
};

export type projectType = {
  id: string;
  name: string;
  description: string;
  slug: string | null | undefined;
  images: string[] | null | undefined;
  links: linkType[] | null | undefined;
  href: string | null | undefined;
  tools: string[];
  dates: string | null | undefined;
  created_at: string | null | undefined;
};
// TODO FIX

export type postsType = {
  id: string;
  title: string;
  slug: string;
  content: string;
  images: string[];
  created_at: string;
};

export type commentsType = {
  id: string;
  comment: string;
  userId: string;
  postId: string;
  created_at: string;
};

export type reviewsType = {
  id: string;
  userId: string;
  review: string;
  rating: number;
  created_at: string;
};
