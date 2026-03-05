import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        links: true,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { links, ...projectData } = body;

    // Update project
    const project = await prisma.project.update({
      where: { id },
      data: projectData,
    });

    // If links provided, update them
    if (links) {
      // Delete existing links
      await prisma.projectLink.deleteMany({
        where: { projectId: id },
      });

      // Create new links
      await prisma.projectLink.createMany({
        data: links.map(
          (link: { type: string; href: string; icon: string }) => ({
            ...link,
            projectId: id,
          })
        ),
      });
    }

    // Fetch updated project with links
    const updatedProject = await prisma.project.findUnique({
      where: { id },
      include: {
        links: true,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Links will be automatically deleted due to onDelete: Cascade
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
