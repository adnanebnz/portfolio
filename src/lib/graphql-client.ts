const GRAPHQL_ENDPOINT =
    process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:8080/graphql";

export class GraphQLError extends Error {
    constructor(
        public errors: Array<{ message: string; path?: string[] }>,
        public data?: unknown
    ) {
        super(errors.map((e) => e.message).join(", "));
        this.name = "GraphQLError";
    }
}

function getAuthToken(): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/(?:^|;\s*)auth-token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
}

export async function graphqlRequest<T = unknown>(
    query: string,
    variables?: Record<string, unknown>,
    options?: { token?: string }
): Promise<T> {
    const token = options?.token ?? getAuthToken();

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers,
        body: JSON.stringify({ query, variables }),
        credentials: "include",
    });

    const json = await response.json();

    if (json.errors?.length) {
        throw new GraphQLError(json.errors, json.data);
    }

    return json.data as T;
}

/**
 * Server-side GraphQL request (for use in server components / server actions).
 * Reads token from cookies using next/headers.
 */
export async function graphqlServerRequest<T = unknown>(
    query: string,
    variables?: Record<string, unknown>
): Promise<T> {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    return graphqlRequest<T>(query, variables, { token: token ?? undefined });
}
