"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { ExternalLink, Calendar, ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Card
      className={cn(
        "group flex flex-col overflow-hidden border h-full bg-card/50 backdrop-blur-sm transition-all duration-300",
        "hover:shadow-lg hover:border-primary/20 hover:-translate-y-1",
        className
      )}
    >
      {/* Image Section */}
      {(image || video) && (
        <Link href={href || "#"} className="block relative overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            {image && (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Arrow indicator */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Header */}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300">
            <Link href={href || "#"} className="hover:underline">
              {title}
            </Link>
          </CardTitle>
          {links && links.length > 0 && (
            <div className="flex items-center space-x-1 ml-2">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Date */}
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{dates}</span>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex-1 pb-4">
        <div className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert line-clamp-3">
          <Markdown>{description}</Markdown>
        </div>
      </CardContent>

      {/* Footer - Tags */}
      <CardFooter className="pt-0">
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 5).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-muted/50 hover:bg-muted transition-colors"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 5 && (
            <Badge variant="secondary" className="text-xs bg-muted/50">
              +{tags.length - 5}
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
