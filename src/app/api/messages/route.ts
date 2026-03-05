import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET all contact messages (admin)
export async function GET() {
  try {
    const contacts = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

// POST new contact message (public)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || "Contact Form Submission",
        message,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

// PUT update contact message (admin)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, read, replied } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Contact ID is required" },
        { status: 400 }
      );
    }

    const contact = await prisma.contactMessage.update({
      where: { id },
      data: {
        ...(read !== undefined && { read }),
        ...(replied !== undefined && { replied }),
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}

// DELETE contact message (admin)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Contact ID is required" },
        { status: 400 }
      );
    }

    await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
