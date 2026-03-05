"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

export function Skeleton({
  className,
  shimmer = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-muted",
        shimmer &&
          "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        className
      )}
      {...props}
    />
  );
}

// ===============================
// Pre-built skeleton layouts
// ===============================

export function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonProjectCard() {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonBlogCard() {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function SkeletonWorkCard() {
  return (
    <div className="rounded-2xl border bg-card p-6 flex gap-4">
      <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export function SkeletonReviewCard() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <div className="flex items-start gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded" />
            ))}
          </div>
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  );
}

export function SkeletonScheduleStep() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonHeroSection() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center gap-6">
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="space-y-3 flex-1">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-12 w-36 rounded-lg" />
        <Skeleton className="h-12 w-36 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonGrid({
  count = 6,
  type = "project",
}: {
  count?: number;
  type?: "project" | "blog" | "work" | "review";
}) {
  const Component =
    type === "project"
      ? SkeletonProjectCard
      : type === "blog"
      ? SkeletonBlogCard
      : type === "review"
      ? SkeletonReviewCard
      : SkeletonWorkCard;

  return (
    <div
      className={cn(
        type === "work" ? "space-y-4" : "grid gap-6",
        type !== "work" && "md:grid-cols-2 lg:grid-cols-3"
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

// Page-level loading states
export function SkeletonPage({
  type = "default",
}: {
  type?: "projects" | "blog" | "reviews" | "schedule" | "default";
}) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Skeleton className="h-16 w-16 rounded-2xl mx-auto" />
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      {/* Content based on type */}
      {type === "projects" && <SkeletonGrid count={6} type="project" />}
      {type === "blog" && <SkeletonGrid count={6} type="blog" />}
      {type === "reviews" && <SkeletonGrid count={6} type="review" />}
      {type === "schedule" && <SkeletonScheduleStep />}
      {type === "default" && <SkeletonGrid count={6} type="project" />}
    </div>
  );
}
