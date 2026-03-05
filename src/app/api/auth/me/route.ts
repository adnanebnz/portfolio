import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAuth, signToken, signRefreshToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("auth-token")?.value;
    const refreshToken = cookieStore.get("refresh-token")?.value;

    // Try to verify access token first
    let auth = await verifyAuth();

    // If access token is invalid but refresh token exists, try to refresh
    if (!auth && refreshToken) {
      try {
        const refreshPayload = verifyToken(refreshToken);
        if (refreshPayload && refreshPayload.userId) {
          // Get user from database
          const user = await prisma.user.findUnique({
            where: { id: refreshPayload.userId },
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              avatarUrl: true,
            },
          });

          if (user) {
            // Generate new tokens
            const newAccessToken = signToken({
              userId: user.id,
              email: user.email,
              role: user.role,
            });

            const newRefreshToken = signRefreshToken({
              userId: user.id,
            });

            // Create response with new tokens
            const response = NextResponse.json({ user });

            response.cookies.set("auth-token", newAccessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: "/",
            });

            response.cookies.set("refresh-token", newRefreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              maxAge: 60 * 60 * 24 * 365, // 1 year
              path: "/",
            });

            return response;
          }
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }

    if (!auth) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatarUrl: true,
      },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
