import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET profile
export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// PUT update profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const profile = await prisma.profile.findFirst();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const updated = await prisma.profile.update({
      where: { id: profile.id },
      data: {
        name: body.name,
        initials: body.initials,
        url: body.url || null,
        location: body.location,
        locationLink: body.locationLink || null,
        avatarUrl: body.avatarUrl || null,
        descriptionEn: body.descriptionEn,
        descriptionFr: body.descriptionFr,
        summaryEn: body.summaryEn,
        summaryFr: body.summaryFr,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
