"use server";

import { prisma } from "@/lib/prisma";
import { projectType, Response } from "@/utils/types";

export async function getAllProjects(): Promise<Response<projectType[]>> {
  try {
    const data = await prisma.project.findMany({
      include: { links: true },
      orderBy: { order: "asc" },
    });
    return { data: data as unknown as projectType[], error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Failed to fetch projects" };
  }
}

export async function getProjectBySlug(
  slug: string
): Promise<Response<projectType>> {
  try {
    const data = await prisma.project.findUnique({
      where: { slug },
      include: { links: true },
    });
    if (!data) {
      return { data: null, error: "Project not found" };
    }
    return { data: data as unknown as projectType, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Failed to fetch project" };
  }
}
