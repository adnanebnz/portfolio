"use client";

import { cn } from "@/lib/utils";

interface ShimmerProps {
  className?: string;
}

export function Shimmer({ className }: ShimmerProps) {
  return (
    <div
      className={cn(
        "animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]",
        className
      )}
    />
  );
}

export function ShimmerCard({ className }: ShimmerProps) {
  return (
    <div className={cn("rounded-xl border bg-card p-6 space-y-4", className)}>
      <Shimmer className="h-40 w-full rounded-lg" />
      <Shimmer className="h-6 w-3/4 rounded" />
      <Shimmer className="h-4 w-1/2 rounded" />
      <div className="flex gap-2">
        <Shimmer className="h-6 w-16 rounded-full" />
        <Shimmer className="h-6 w-16 rounded-full" />
        <Shimmer className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function ShimmerProjectCard() {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <Shimmer className="h-48 w-full" />
      <div className="p-6 space-y-4">
        <Shimmer className="h-6 w-3/4 rounded" />
        <Shimmer className="h-4 w-full rounded" />
        <Shimmer className="h-4 w-2/3 rounded" />
        <div className="flex gap-2 pt-2">
          <Shimmer className="h-6 w-20 rounded-full" />
          <Shimmer className="h-6 w-20 rounded-full" />
          <Shimmer className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ShimmerWorkCard() {
  return (
    <div className="rounded-2xl border bg-card p-6 flex gap-4">
      <Shimmer className="h-12 w-12 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <Shimmer className="h-5 w-1/3 rounded" />
        <Shimmer className="h-4 w-1/4 rounded" />
        <Shimmer className="h-4 w-full rounded" />
        <Shimmer className="h-4 w-5/6 rounded" />
      </div>
    </div>
  );
}

export function ShimmerBlogCard() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Shimmer className="h-4 w-24 rounded" />
        <Shimmer className="h-4 w-4 rounded-full" />
        <Shimmer className="h-4 w-16 rounded" />
      </div>
      <Shimmer className="h-6 w-3/4 rounded" />
      <Shimmer className="h-4 w-full rounded" />
      <Shimmer className="h-4 w-2/3 rounded" />
    </div>
  );
}

export function ShimmerAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-20 w-20",
  };
  return <Shimmer className={cn("rounded-full", sizeClasses[size])} />;
}

export function ShimmerText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer
          key={i}
          className={cn("h-4 rounded", i === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}

// Grid of shimmer cards for projects/blog
export function ShimmerGrid({
  count = 6,
  type = "project",
}: {
  count?: number;
  type?: "project" | "blog" | "work";
}) {
  const Component =
    type === "project"
      ? ShimmerProjectCard
      : type === "blog"
      ? ShimmerBlogCard
      : ShimmerWorkCard;

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
