import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import React from "react";
import { getAllProjects } from "./logic/logic";

const ProjectsPage = async () => {
  const projects = await getAllProjects();
  const BLUR_FADE_DELAY = 0.04;

  return (
    <BlurFade delay={BLUR_FADE_DELAY * 10}>
      <section
        id="projects"
        className="max-w-4xl mx-auto md:py-16 py-8 px-4 md:px-0"
      >
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Projects
        </h1>
        {projects.data?.length === 0 ? (
          <div className="text-muted-foreground text-center mt-10">
            No projects found.
          </div>
        ) : (
          <div className="space-y-12 w-full py-10">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                    Check out my projects!
                  </h2>
                  <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                    I&apos;ve worked on a variety of projects, from simple
                    websites to complex web and mobile applications. Here are a
                    few of my favorites.
                  </p>
                </div>
              </div>
            </BlurFade>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
              {projects.data?.map((project, id) => (
                <BlurFade
                  key={project.name}
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                >
                  <ProjectCard
                    href={project.href}
                    key={project.id}
                    title={project.name}
                    description={project.description}
                    dates={project.dates}
                    tags={project.tools}
                    image={project.images[0]}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </div>
          </div>
        )}
      </section>
    </BlurFade>
  );
};

export default ProjectsPage;
