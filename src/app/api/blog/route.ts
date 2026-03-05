import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");
    const limit = searchParams.get("limit");

    const where: Record<string, unknown> = {};

    if (published === "true") {
      where.published = true;
    } else if (published === "false") {
      where.published = false;
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST create new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      slug,
      titleEn,
      titleFr,
      summaryEn,
      summaryFr,
      contentEn,
      contentFr,
      coverImage,
      published,
      tags,
    } = body;

    // Validate required fields
    if (!slug || !titleEn || !titleFr || !contentEn || !contentFr) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    const post = await prisma.blogPost.create({
      data: {
        slug,
        titleEn,
        titleFr,
        summaryEn: summaryEn || "",
        summaryFr: summaryFr || "",
        contentEn,
        contentFr,
        coverImage,
        published: published || false,
        publishedAt: published ? new Date() : null,
        tags: tags || [],
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
