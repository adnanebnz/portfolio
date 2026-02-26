import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { signToken, verifyToken, signRefreshToken, type JWTPayload } from "./jwt";

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createUser(
  email: string,
  password: string,
  name: string
) {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = signRefreshToken({
    userId: user.id,
  });

  return {
    token,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatarUrl: user.avatarUrl,
    },
  };
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      avatarUrl: true,
    },
  });

  return user;
}

export async function updateUserPassword(userId: string, newPassword: string) {
  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
}

export async function updateUserProfile(
  userId: string,
  data: { name?: string; avatarUrl?: string }
) {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      avatarUrl: true,
    },
  });
}

export async function verifyAuth(): Promise<JWTPayload | null> {
  // This function is meant to be called from server-side API routes
  // It extracts and verifies the JWT token from cookies
  const { cookies } = await import("next/headers");
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = verifyToken(token);
    return payload;
  } catch {
    return null;
  }
}

export { signToken, verifyToken, signRefreshToken, type JWTPayload };
