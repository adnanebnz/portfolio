import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET all public data for the portfolio (profile, work, skills, projects, socials)
export async function GET() {
  try {
    // Fetch profile with related data
    const profile = await prisma.profile.findFirst({
      include: {
        contact: {
          include: {
            socials: true,
          },
        },
        skills: {
          orderBy: { order: "asc" },
        },
        work: {
          orderBy: { order: "asc" },
        },
        education: {
          orderBy: { startDate: "desc" },
        },
      },
    });

    // Fetch featured projects
    const featuredProjects = await prisma.project.findMany({
      where: {
        featured: true,
        active: true,
      },
      include: {
        links: true,
      },
      orderBy: { order: "asc" },
    });

    // Fetch CV files
    const cvFiles = await prisma.cVFile.findMany({
      where: { isActive: true },
    });

    // Fetch approved reviews
    const reviews = await prisma.review.findMany({
      where: {
        approved: true,
        featured: true,
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    return NextResponse.json({
      profile,
      featuredProjects,
      cvFiles,
      reviews,
    });
  } catch (error) {
    console.error("Error fetching public data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
