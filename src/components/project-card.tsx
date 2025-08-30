"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { ExternalLink, Calendar, ArrowUpRight, Play } from "lucide-react";

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
    <motion.div
      className="group h-full"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className={cn(
        "flex flex-col overflow-hidden border-0 h-full bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:from-card/80 hover:to-card/60 transition-all duration-500 relative",
        "hover:shadow-2xl hover:shadow-primary/10",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/5 before:to-pink-500/5 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        className
      )}>
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        
        {/* Card Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Image/Video Section */}
          {(image || video) && (
            <div className="relative overflow-hidden">
              <Link href={href || "#"} className="block">
                <motion.div
                  className="relative h-48 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {video ? (
                    <div className="relative w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </motion.div>
                    </div>
                  ) : image ? (
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : null}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Quick Actions Overlay */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </div>
          )}

          {/* Header */}
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300">
                <Link href={href || "#"} className="hover:underline">
                  {title}
                </Link>
              </CardTitle>
              {links && links.length > 0 && (
                <div className="flex items-center space-x-2 ml-2">
                  {links.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {link.icon}
                    </motion.a>
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

          {/* Footer */}
          <CardFooter className="pt-0">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Badge 
                    variant="secondary"
                    className="text-xs bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 border border-purple-500/20"
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
