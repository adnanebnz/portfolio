import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// MUST match the Spring Boot backend's jwt.secret property
const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    // Spring Boot uses 'sub' for userId, 'email' and 'role' as claims
    return {
      userId: decoded.sub as string,
      email: decoded.email as string,
      role: decoded.role as string,
    };
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
