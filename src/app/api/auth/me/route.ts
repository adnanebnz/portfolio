import { NextResponse } from "next/server";
import { getSession } from "@/lib/jwt";
import { getUserById } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/auth/me - Get current user
export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = await getUserById(session.userId);

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
