import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET all work experiences
export async function GET() {
  try {
    const workExperiences = await prisma.workExperience.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(workExperiences);
  } catch (error) {
    console.error("Error fetching work experiences:", error);
    return NextResponse.json(
      { error: "Failed to fetch work experiences" },
      { status: 500 }
    );
  }
}

// POST create new work experience
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get the profile (assuming single profile)
    const profile = await prisma.profile.findFirst();
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const workExperience = await prisma.workExperience.create({
      data: {
        ...body,
        profileId: profile.id,
      },
    });

    return NextResponse.json(workExperience, { status: 201 });
  } catch (error) {
    console.error("Error creating work experience:", error);
    return NextResponse.json(
      { error: "Failed to create work experience" },
      { status: 500 }
    );
  }
}
