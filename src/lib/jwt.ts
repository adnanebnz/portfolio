import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";
const JWT_EXPIRES_IN = "30d";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your-super-secret-refresh-key-change-in-production";
const REFRESH_TOKEN_EXPIRES_IN = "1y";

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export function signRefreshToken(payload: { userId: string }): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

export function verifyRefreshToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) return null;

  return verifyToken(token);
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return session?.role === "ADMIN";
}
