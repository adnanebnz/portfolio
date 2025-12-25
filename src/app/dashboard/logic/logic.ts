"use server";

import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/jwt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getUserCount() {
  const count = await prisma.user.count();
  return count;
}

export async function getPostsCount() {
  const count = await prisma.blogPost.count();
  return count;
}

export async function getProjectsCount() {
  const count = await prisma.project.count();
  return count;
}

export async function getWorkCount() {
  const count = await prisma.workExperience.count();
  return count;
}

export async function isUserAdmin() {
  return await isAdmin();
}

// Add new project using Prisma
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

  try {
    await prisma.project.create({
      data: {
        slug,
        titleEn: name,
        titleFr: name,
        descriptionEn: description || "",
        descriptionFr: description || "",
        technologies: tools.filter((t) => t),
        dates: dates || null,
        href: demolink || null,
        links: {
          create: [
            ...(ghlink
              ? [{ type: "Source Code", href: ghlink, icon: "github" }]
              : []),
            ...(demolink
              ? [{ type: "Live Demo", href: demolink, icon: "globe" }]
              : []),
            ...(storelink
              ? [{ type: "Store", href: storelink, icon: "store" }]
              : []),
          ],
        },
      },
    });

    revalidatePath("/dashboard", "layout");
    redirect("/dashboard");
  } catch (error) {
    console.error("Error adding project:", error);
    return { errors: [{ message: "Failed to add project" }] };
  }
}

// Delete project using Prisma
export async function deleteProject(slug: string) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.project.delete({
      where: { slug },
    });
    revalidatePath("/dashboard", "layout");
    redirect("/dashboard");
  } catch (error) {
    console.error("Error deleting project:", error);
    return { error: "Failed to delete project" };
  }
}
