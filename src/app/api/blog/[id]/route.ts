import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET single blog post by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try to find by ID first, then by slug
    let post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      post = await prisma.blogPost.findUnique({
        where: { slug: id },
      });
    }

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

// PUT update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Check slug uniqueness if changed
    if (slug && slug !== existingPost.slug) {
      const slugExists = await prisma.blogPost.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // If publishing for the first time, set publishedAt
    const publishedAt =
      published && !existingPost.published
        ? new Date()
        : existingPost.publishedAt;

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        slug: slug || existingPost.slug,
        titleEn: titleEn || existingPost.titleEn,
        titleFr: titleFr || existingPost.titleFr,
        summaryEn: summaryEn ?? existingPost.summaryEn,
        summaryFr: summaryFr ?? existingPost.summaryFr,
        contentEn: contentEn || existingPost.contentEn,
        contentFr: contentFr || existingPost.contentFr,
        coverImage: coverImage ?? existingPost.coverImage,
        published: published ?? existingPost.published,
        publishedAt,
        tags: tags ?? existingPost.tags,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
