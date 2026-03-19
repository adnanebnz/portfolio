// Auth functions - now handled by Spring Boot GraphQL backend
// This file is kept for backwards compatibility with any remaining imports
// Primary auth flow: GraphQL login mutation → JWT → cookie

import { signToken, verifyToken, type JWTPayload } from "./jwt";
import { graphqlServerRequest } from "./graphql-client";

export async function getUserById(userId: string) {
  try {
    const data = await graphqlServerRequest<{ me: any }>(`
      query { me { id email username displayName role avatarUrl } }
    `);
    return data.me
      ? {
        id: data.me.id,
        email: data.me.email,
        name: data.me.displayName || data.me.username,
        role: data.me.role,
        avatarUrl: data.me.avatarUrl,
      }
      : null;
  } catch {
    return null;
  }
}

export async function verifyAuth(): Promise<JWTPayload | null> {
  const { cookies } = await import("next/headers");
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token")?.value;

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

export { signToken, verifyToken, type JWTPayload };
