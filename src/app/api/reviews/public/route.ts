import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET approved reviews only (for public display)
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { approved: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching public reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST - Allow visitors to submit reviews (unapproved by default)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.role || !body.company || !body.content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create review with approved=false (needs admin approval)
    const review = await prisma.review.create({
      data: {
        name: body.name,
        role: body.role,
        company: body.company,
        content: body.content,
        rating: Math.min(5, Math.max(1, body.rating || 5)),
        approved: false, // Requires admin approval
        featured: false,
      },
    });

    return NextResponse.json(
      {
        message:
          "Review submitted successfully. It will be visible after approval.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
