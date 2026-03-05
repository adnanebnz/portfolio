"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink, Building2, MapPin } from "lucide-react";

interface Props {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  className?: string;
}

export function ResumeCard({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  className,
}: Props) {
  return (
    <motion.div
      className="group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card
        className={cn(
          "flex flex-col border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:from-card/80 hover:to-card/60 transition-all duration-500 relative overflow-hidden",
          "hover:shadow-2xl hover:shadow-primary/10",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/5 before:to-pink-500/5 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
          className
        )}
      >
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

        {/* Card Content */}
        <div className="relative z-10">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                {/* Company Logo */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar className="w-16 h-16 border-2 border-primary/20 shadow-lg bg-white">
                    <AvatarImage
                      src={logoUrl}
                      alt={altText}
                      className="object-contain"
                    />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                      {altText[0]}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                {/* Company & Role Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors duration-300">
                      {href ? (
                        <Link
                          href={href}
                          className="hover:underline flex items-center space-x-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{title}</span>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                      ) : (
                        title
                      )}
                    </h3>
                  </div>

                  {subtitle && (
                    <div className="flex items-center text-muted-foreground mt-1">
                      <Building2 className="w-4 h-4 mr-2" />
                      <p className="text-sm font-medium">{subtitle}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Period */}
              <div className="text-right ml-4">
                <motion.div
                  className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary"
                  whileHover={{ scale: 1.05 }}
                >
                  {period}
                </motion.div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Description */}
            {description && (
              <motion.div
                className="text-sm text-muted-foreground leading-relaxed mb-4"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {description}
              </motion.div>
            )}

            {/* Technologies/Skills */}
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-xs bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 border border-purple-500/20 cursor-default"
                    >
                      {badge}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-500" />
      </Card>
    </motion.div>
  );
}
