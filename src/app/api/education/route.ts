import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET all education entries
export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { startDate: "desc" },
    });
    return NextResponse.json(education);
  } catch (error) {
    console.error("Error fetching education:", error);
    return NextResponse.json(
      { error: "Failed to fetch education" },
      { status: 500 }
    );
  }
}

// POST create new education entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const profile = await prisma.profile.findFirst();
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const education = await prisma.education.create({
      data: {
        ...body,
        profileId: profile.id,
      },
    });

    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    console.error("Error creating education:", error);
    return NextResponse.json(
      { error: "Failed to create education" },
      { status: 500 }
    );
  }
}
