"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { graphqlRequest } from "@/lib/graphql-client";

interface User {
  id: string;
  email: string;
  username: string;
  displayName: string | null;
  role: string;
  avatarUrl?: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function setAuthCookie(token: string) {
  // Set cookie with 7-day expiry, accessible by middleware
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `auth-token=${encodeURIComponent(token)}; path=/; expires=${expires}; SameSite=Lax`;
}

function clearAuthCookie() {
  document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshUser = async () => {
    try {
      const data = await graphqlRequest<{ me: User | null }>(
        `query { me { id email username displayName role avatarUrl } }`
      );
      setUser(data.me);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await graphqlRequest<{
        login: { token: string; user: User };
      }>(
        `mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
            user { id email username displayName role avatarUrl }
          }
        }`,
        { email, password }
      );

      setAuthCookie(data.login.token);
      setUser(data.login.user);
      router.refresh();
      return {};
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Login failed",
      };
    }
  };

  const logout = async () => {
    clearAuthCookie();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
