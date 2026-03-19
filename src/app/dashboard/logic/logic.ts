"use server";

import { graphqlServerRequest } from "@/lib/graphql-client";
import { isAdmin } from "@/lib/jwt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface DashboardStats {
  userCount: number;
  postCount: number;
  projectCount: number;
  workCount: number;
  messageCount: number;
  reviewCount: number;
}

async function getStats(): Promise<DashboardStats> {
  const data = await graphqlServerRequest<{ dashboardStats: DashboardStats }>(
    `query { dashboardStats { userCount postCount projectCount workCount messageCount reviewCount } }`
  );
  return data.dashboardStats;
}

export async function getUserCount() {
  const stats = await getStats();
  return stats.userCount;
}

export async function getPostsCount() {
  const stats = await getStats();
  return stats.postCount;
}

export async function getProjectsCount() {
  const stats = await getStats();
  return stats.projectCount;
}

export async function getWorkCount() {
  const stats = await getStats();
  return stats.workCount;
}

export async function isUserAdmin() {
  return await isAdmin();
}

// Add new project via GraphQL
export async function addNewProject(prevState: any, formData: FormData) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return { errors: [{ message: "Unauthorized" }] };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const tools = formData.getAll("tools") as string[];
  const dates = formData.get("dates") as string;
  const ghlink = formData.get("ghlink") as string;
  const demolink = formData.get("demolink") as string;
  const storelink = formData.get("storelink") as string;

  if (!name) {
    return { errors: [{ message: "Name is required" }] };
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const links = [
    ...(ghlink ? [{ type: "Source Code", href: ghlink, icon: "github" }] : []),
    ...(demolink ? [{ type: "Live Demo", href: demolink, icon: "globe" }] : []),
    ...(storelink ? [{ type: "Store", href: storelink, icon: "store" }] : []),
  ];

  try {
    await graphqlServerRequest(
      `mutation CreateProject($input: CreateProjectInput!) {
        createProject(input: $input) { id }
      }`,
      {
        input: {
          slug,
          titleEn: name,
          titleFr: name,
          descriptionEn: description || "",
          descriptionFr: description || "",
          technologies: tools.filter((t) => t),
          dates: dates || null,
          href: demolink || null,
          links,
          ownerId: "1",
        },
      }
    );

    revalidatePath("/dashboard", "layout");
    redirect("/dashboard");
  } catch (error) {
    console.error("Error adding project:", error);
    return { errors: [{ message: "Failed to add project" }] };
  }
}

// Delete project via GraphQL
export async function deleteProject(slug: string) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return { error: "Unauthorized" };
  }

  try {
    // First find the project by slug to get its id
    const data = await graphqlServerRequest<{
      projectBySlug: { id: string } | null;
    }>(
      `query ProjectBySlug($slug: String!) { projectBySlug(slug: $slug) { id } }`,
      { slug }
    );

    if (!data.projectBySlug) {
      return { error: "Project not found" };
    }

    await graphqlServerRequest(
      `mutation DeleteProject($id: ID!) { deleteProject(id: $id) }`,
      { id: data.projectBySlug.id }
    );

    revalidatePath("/dashboard", "layout");
    redirect("/dashboard");
  } catch (error) {
    console.error("Error deleting project:", error);
    return { error: "Failed to delete project" };
  }
}
