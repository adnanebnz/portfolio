"use server";

import { graphqlServerRequest } from "@/lib/graphql-client";
import { projectType, Response } from "@/utils/types";

const PROJECT_FIELDS = `
  id slug titleEn titleFr subtitleEn subtitleFr descriptionEn descriptionFr
  href dates active featured order posterImage mobileAppImages webAppImages
  technologies keyFeaturesEn keyFeaturesFr
  links { id type href icon }
  createdAt updatedAt
`;

export async function getAllProjects(): Promise<Response<projectType[]>> {
  try {
    const data = await graphqlServerRequest<{ projects: projectType[] }>(`
      query { projects { ${PROJECT_FIELDS} } }
    `);
    return { data: data.projects, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Failed to fetch projects" };
  }
}

export async function getProjectBySlug(
  slug: string
): Promise<Response<projectType>> {
  try {
    const data = await graphqlServerRequest<{ projectBySlug: projectType | null }>(`
      query GetProject($slug: String!) {
        projectBySlug(slug: $slug) { ${PROJECT_FIELDS} }
      }
    `, { slug });
    if (!data.projectBySlug) {
      return { data: null, error: "Project not found" };
    }
    return { data: data.projectBySlug, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Failed to fetch project" };
  }
}
