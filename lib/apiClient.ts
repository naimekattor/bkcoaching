// lib/apiClient.ts
export interface ApiOptions extends RequestInit {
  auth?: boolean;
  raw?: boolean;
}

export async function apiClient<T = any>(
  endpoint: string,
  { auth = false, headers, raw = false, ...options }: ApiOptions = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = baseUrl.endsWith("/")
    ? `${baseUrl}${endpoint}`
    : `${baseUrl}${endpoint}`;

  // get token from localStorage
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  console.log(
    "🔐 Auth:",
    auth,
    "| Token:",
    token ? `${token.substring(0, 20)}...` : "null"
  );

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...options,
  });

  if (raw) return res as unknown as T;

  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) {
    const message =
      data?.message || data?.error || res.statusText || "API error";
    const err: any = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data as T;
}
