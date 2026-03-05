"use client";
import BlurFade from "@/components/magicui/blur-fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Smartphone,
  Monitor,
  Sparkles,
  Calendar,
  Code2,
  ZoomIn,
} from "lucide-react";
import { ImageLightbox } from "./image-lightbox";

interface ProjectLink {
  type: string;
  href: string;
  icon?: string;
}

interface ProjectViewProps {
  project: {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    image: string | null;
    mobileAppImages: string[];
    webAppImages: string[];
    technologies: string[];
    dates?: string | null;
    keyFeatures: Record<string, string>;
    links?: ProjectLink[];
  };
}

export default function ProjectView({ project }: ProjectViewProps) {
  const BLUR_FADE_DELAY = 0.04;
  const hasKeyFeatures =
    project.keyFeatures && Object.keys(project.keyFeatures).length > 0;
  const hasMobileImages =
    project.mobileAppImages && project.mobileAppImages.length > 0;
  const hasWebImages = project.webAppImages && project.webAppImages.length > 0;

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState("");

  const openLightbox = (images: string[], index: number, title: string) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxTitle(title);
    setLightboxOpen(true);
  };

  const openPosterLightbox = () => {
    if (project.image) {
      openLightbox([project.image], 0, project.title);
    }
  };

  return (
    <>
      <ImageLightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={lightboxTitle}
      />

      <div className="flex flex-col min-h-[100dvh]">
        {/* Hero Section - Title First! */}
        <section className="w-full pt-8 md:pt-16 lg:pt-24 pb-8">
          <div className="container max-w-6xl mx-auto px-4">
            <BlurFade delay={BLUR_FADE_DELAY}>
              {/* Back Link */}
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to projects
              </Link>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="space-y-6">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  {project.title}
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                  {project.subtitle}
                </p>

                {/* Meta Info Row */}
                <div className="flex flex-wrap gap-4 items-center pt-2">
                  {project.dates && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      {project.dates}
                    </div>
                  )}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-3 py-1.5 text-sm text-muted-foreground">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {project.links && project.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-4">
                    {project.links.map((link: ProjectLink) => {
                      const isLiveDemo =
                        link.type.toLowerCase().includes("live") ||
                        link.type.toLowerCase().includes("demo");
                      const isSource =
                        link.type.toLowerCase().includes("source") ||
                        link.type.toLowerCase().includes("github");

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                            isLiveDemo
                              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          }`}
                        >
                          {isLiveDemo ? (
                            <ExternalLink className="h-4 w-4" />
                          ) : isSource ? (
                            <Github className="h-4 w-4" />
                          ) : (
                            <Code2 className="h-4 w-4" />
                          )}
                          {link.type}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Poster Image */}
        {project.image && (
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <section className="w-full py-8">
              <div className="container max-w-5xl mx-auto px-4">
                <button
                  onClick={openPosterLightbox}
                  className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group cursor-zoom-in"
                >
                  <Image
                    priority
                    src={project.image}
                    fill
                    alt={project.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                      <ZoomIn className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </button>
              </div>
            </section>
          </BlurFade>
        )}

        {/* Mobile App Screenshots */}
        {hasMobileImages && (
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <section className="w-full py-12 bg-gradient-to-b from-muted/50 to-background">
              <div className="container max-w-6xl mx-auto px-4">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Mobile Application
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    (Click to zoom)
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {project.mobileAppImages.map(
                    (image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() =>
                          openLightbox(
                            project.mobileAppImages,
                            index,
                            "Mobile Screenshots"
                          )
                        }
                        className="relative aspect-[9/19] rounded-2xl overflow-hidden bg-muted shadow-lg ring-1 ring-white/5 hover:ring-primary/50 transition-all hover:scale-[1.02] group cursor-zoom-in"
                      >
                        <Image
                          width={360}
                          height={760}
                          src={image}
                          alt={`${project.title} mobile screenshot ${
                            index + 1
                          }`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                          <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                            <ZoomIn className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>
            </section>
          </BlurFade>
        )}

        {/* Web App Screenshots */}
        {hasWebImages && (
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <section className="w-full py-12">
              <div className="container max-w-6xl mx-auto px-4">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Monitor className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Web Application
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    (Click to zoom)
                  </span>
                </div>
                <Carousel className="w-full">
                  <CarouselContent>
                    {project.webAppImages.map(
                      (image: string, index: number) => (
                        <CarouselItem key={index}>
                          <button
                            onClick={() =>
                              openLightbox(
                                project.webAppImages,
                                index,
                                "Web Screenshots"
                              )
                            }
                            className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted shadow-xl ring-1 ring-white/5 group cursor-zoom-in"
                          >
                            <Image
                              src={image}
                              fill
                              alt={`${project.title} web screenshot ${
                                index + 1
                              }`}
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                              <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                                <ZoomIn className="h-6 w-6 text-white" />
                              </div>
                            </div>
                          </button>
                        </CarouselItem>
                      )
                    )}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm" />
                  <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm" />
                </Carousel>
              </div>
            </section>
          </BlurFade>
        )}

        {/* Key Features Section */}
        {hasKeyFeatures && (
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <section className="w-full py-16 bg-gradient-to-b from-background via-muted/30 to-background">
              <div className="container max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    <Sparkles className="h-4 w-4" />
                    Key Features
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    What Makes it Special
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Discover the powerful capabilities that make {project.title}{" "}
                    a standout solution.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(project.keyFeatures).map(
                    ([key, value], index) => (
                      <div
                        key={key}
                        className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold">
                            {index + 1}
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                              {key}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {value as ReactNode}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>
          </BlurFade>
        )}

        {/* Project Details Section */}
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <section className="w-full py-16 bg-muted/30">
            <div className="container max-w-4xl mx-auto px-4">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  About This Project
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Full Tech Stack */}
              {project.technologies.length > 0 && (
                <div className="mt-10 pt-8 border-t border-border/50">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-primary" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-lg bg-background border border-border text-sm font-medium hover:border-primary/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </BlurFade>

        {/* CTA Section */}
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <section className="w-full py-16">
            <div className="container max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Interested in working together?
              </h2>
              <p className="text-muted-foreground mb-8">
                Let&apos;s discuss your next project and bring your ideas to
                life.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/schedule"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                >
                  Schedule a Call
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  View More Projects
                </Link>
              </div>
            </div>
          </section>
        </BlurFade>
      </div>
    </>
  );
}
