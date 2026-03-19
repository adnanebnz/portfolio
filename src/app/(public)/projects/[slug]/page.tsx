import { graphqlServerRequest } from "@/lib/graphql-client";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ProjectView from "./components/project-view";

async function getProject(slug: string) {
  try {
    const data = await graphqlServerRequest<{ projectBySlug: any }>(`
      query GetProject($slug: String!) {
        projectBySlug(slug: $slug) {
          id slug titleEn titleFr descriptionEn descriptionFr
          posterImage mobileAppImages webAppImages technologies
          dates keyFeaturesEn keyFeaturesFr active
          links { id type href icon }
        }
      }
    `, { slug });
    return data.projectBySlug;
  } catch {
    return null;
  }
}

const ProjectPage = async ({ params }: { params: { slug: string } }) => {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";

  const project = await getProject(params.slug);

  if (!project || !project.active) {
    notFound();
  }

  // Transform to match the view component's expected format
  const transformedProject = {
    slug: project.slug,
    title: locale === "fr" ? project.titleFr : project.titleEn,
    subtitle: locale === "fr" ? project.descriptionFr : project.descriptionEn,
    description:
      locale === "fr" ? project.descriptionFr : project.descriptionEn,
    image: project.posterImage,
    mobileAppImages: project.mobileAppImages,
    webAppImages: project.webAppImages,
    technologies: project.technologies,
    dates: project.dates,
    keyFeatures:
      ((locale === "fr"
        ? project.keyFeaturesFr
        : project.keyFeaturesEn) as Record<string, string>) || {},
    links: project.links.map((link) => ({
      type: link.type,
      href: link.href,
      icon: link.icon,
    })),
  };

  return <ProjectView project={transformedProject} />;
};

export default ProjectPage;
