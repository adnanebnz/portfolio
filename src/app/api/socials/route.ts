import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET socials
export async function GET() {
  try {
    const contact = await prisma.contact.findFirst({
      include: {
        socials: true,
      },
    });

    if (!contact) {
      return NextResponse.json({ socials: [] });
    }

    return NextResponse.json(contact.socials);
  } catch (error) {
    console.error("Error fetching socials:", error);
    return NextResponse.json(
      { error: "Failed to fetch socials" },
      { status: 500 }
    );
  }
}

// POST create new social
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Get or create contact
    let contact = await prisma.contact.findFirst();
    if (!contact) {
      const profile = await prisma.profile.findFirst();
      if (!profile) {
        return NextResponse.json(
          { error: "Profile not found" },
          { status: 404 }
        );
      }
      contact = await prisma.contact.create({
        data: {
          email: body.email || "contact@example.com",
          profileId: profile.id,
        },
      });
    }

    const social = await prisma.social.create({
      data: {
        name: body.name,
        url: body.url,
        icon: body.icon,
        showInNav: body.showInNav ?? true,
        contactId: contact.id,
      },
    });

    return NextResponse.json(social, { status: 201 });
  } catch (error) {
    console.error("Error creating social:", error);
    return NextResponse.json(
      { error: "Failed to create social" },
      { status: 500 }
    );
  }
}

// PUT update social
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Social ID is required" },
        { status: 400 }
      );
    }

    const social = await prisma.social.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.url !== undefined && { url: data.url }),
        ...(data.icon !== undefined && { icon: data.icon }),
        ...(data.showInNav !== undefined && { showInNav: data.showInNav }),
      },
    });

    return NextResponse.json(social);
  } catch (error) {
    console.error("Error updating social:", error);
    return NextResponse.json(
      { error: "Failed to update social" },
      { status: 500 }
    );
  }
}

// DELETE social
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Social ID is required" },
        { status: 400 }
      );
    }

    await prisma.social.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting social:", error);
    return NextResponse.json(
      { error: "Failed to delete social" },
      { status: 500 }
    );
  }
}
