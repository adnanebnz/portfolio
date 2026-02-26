import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";
import { z } from "zod";

export const dynamic = "force-dynamic";

const emailSchema = z.object({
    newEmail: z.string().email("Invalid email address"),
});

export async function PUT(request: NextRequest) {
    try {
        const auth = await verifyAuth();
        if (!auth) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const result = emailSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.errors[0].message },
                { status: 400 }
            );
        }

        const { newEmail } = result.data;

        // Check if email already in use
        const existing = await prisma.user.findUnique({
            where: { email: newEmail },
        });

        if (existing && existing.id !== auth.userId) {
            return NextResponse.json(
                { error: "Email already in use" },
                { status: 400 }
            );
        }

        await prisma.user.update({
            where: { id: auth.userId },
            data: { email: newEmail },
        });

        return NextResponse.json({ message: "Email updated successfully" });
    } catch (error) {
        console.error("Error changing email:", error);
        return NextResponse.json(
            { error: "Failed to update email" },
            { status: 500 }
        );
    }
}
