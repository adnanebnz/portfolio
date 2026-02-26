import { NextRequest, NextResponse } from "next/server";
import { signToken, verifyRefreshToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    try {
        const refreshToken = request.cookies.get("refresh-token")?.value;

        if (!refreshToken) {
            return NextResponse.json({ error: "No refresh token provided" }, { status: 401 });
        }

        const payload = verifyRefreshToken(refreshToken);

        if (!payload) {
            return NextResponse.json({ error: "Invalid or expired refresh token" }, { status: 401 });
        }

        // Optional: Check if user exists still
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 401 });
        }

        const newToken = signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        const response = NextResponse.json({
            message: "Token refreshed successfully",
        });

        response.cookies.set("auth-token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
        });

        return response;
    } catch (error) {
        const message = error instanceof Error ? error.message : "Refresh failed";
        return NextResponse.json({ error: message }, { status: 401 });
    }
}
