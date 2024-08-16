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
import { ReactNode } from "react";
export default function ProjectView({ project }: { project: any }) {
  const BLUR_FADE_DELAY = 0.04;
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full pt-8 md:pt-16 lg:pt-24 mb-4">
        <div className="container space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {project.title}
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-3">
                  {project.subtitle}
                </p>
              </div>
            </div>
          </BlurFade>
          {project.mobileAppImages?.length > 0 && (
            <BlurFade delay={BLUR_FADE_DELAY * 11} className="space-y-4 mb-3">
              <h1 className="text-xl font-bold tracking-tighter sm:text-2xl">
                Mobile application images:
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-200 dark:bg-muted py-4 px-3 rounded-md shadow-sm">
                {project.mobileAppImages.map((image: string, index: number) => (
                  <Image
                    fetchPriority="high"
                    priority
                    src={image}
                    key={index}
                    alt={project.title}
                    className="rounded-lg object-cover w-full h-auto"
                  />
                ))}
              </div>
            </BlurFade>
          )}
          {project.webAppImages?.length > 0 && (
            <BlurFade delay={BLUR_FADE_DELAY * 12} className="space-y-4 mb-3">
              <h1 className="text-xl font-bold tracking-tighter sm:text-2xl">
                Web application images:
              </h1>
              <Carousel className="w-11/12 flex items-center justify-center mx-auto">
                <CarouselContent>
                  {project.webAppImages.map((image: string, index: number) => (
                    <CarouselItem
                      className="flex items-center justify-center mx-auto"
                      key={index}
                    >
                      <Image
                        priority
                        fetchPriority="high"
                        src={image}
                        height={650}
                        width={650}
                        alt={project.title}
                        className="rounded-lg object-cover mx-auto"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-gray-100 dark:bg-zinc-800" />
                <CarouselNext className="bg-gray-100 dark:bg-zinc-800" />
              </Carousel>
            </BlurFade>
          )}
        </div>
      </section>
      <BlurFade delay={BLUR_FADE_DELAY * 13}>
        <section className="w-full py-8 md:py-16  bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Project Details
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  {project.title}
                </h2>
                <div className="text-muted-foreground">
                  <p>{project.description}</p>
                </div>
                <div className="flex gap-4">
                  {project.links?.map((link: any) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`inline-flex h-9 items-center justify-center rounded-md ${
                        link.type === "Live Demo"
                          ? "bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                          : "border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      }`}
                      prefetch={false}
                    >
                      {link.icon}
                      <span className="ml-2">{link.type}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Project Details
                </div>
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-xl font-bold">Technologies</h3>
                    {project.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="inline-block px-3 py-1 mx-1 my-1 text-sm bg-background rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Timeline</h3>
                    <p className="text-muted-foreground">{project.dates}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 14}>
        <section className="w-full py-8 md:py-16 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Project Highlights
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {project.title} offers a range of powerful features to
                  streamline your business operations and provide valuable
                  insights.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  {Object.entries(project.keyFeatures).map(([key, value]) => (
                    <li key={key}>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">{key}</h3>
                        <p className="text-muted-foreground">
                          {value as ReactNode}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <Image
                priority
                fetchPriority="high"
                src={project.image}
                width={300}
                height={300}
                alt={project.title}
                className="mx-auto object-cover overflow-hidden rounded-xl object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
      </BlurFade>
    </div>
  );
}
