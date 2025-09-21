const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ?? "http://localhost:5000/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function request<T>(
  path: string,
  options: { method?: HttpMethod; body?: any; headers?: Record<string, string> } = {}
): Promise<T> {
  const url = `${BASE_URL}/${path.replace(/^\/+/, "")}`;
  const res = await fetch(url, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  // API envelope support { success, data, message }
  const text = await res.text();
  const isJson = text.startsWith("{") || text.startsWith("[");
  const payload = isJson ? JSON.parse(text) : text;

  const unwrap = (p: any) =>
    p && typeof p === "object" && "success" in p && ("data" in p || "message" in p)
      ? p.success
        ? p.data
        : Promise.reject(new Error(p.message ?? "Request failed"))
      : p;

  if (!res.ok) {
    const msg =
      (payload && payload.message) ||
      (typeof payload === "string" ? payload : `${res.status} ${res.statusText}`);
    throw new Error(msg);
  }

  return unwrap(payload) as T;
}

export const http = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: any) => request<T>(path, { method: "POST", body }),
  put:  <T>(path: string, body?: any) => request<T>(path, { method: "PUT", body }),
  del:  <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

export function toIsoLocal(date: Date): string {
  // keep local wall-clock; API expects ISO (your API uses DateTime with Kind=Local usually)
  const z = (n: number) => String(n).padStart(2, "0");
  const y = date.getFullYear();
  const m = z(date.getMonth() + 1);
  const d = z(date.getDate());
  const hh = z(date.getHours());
  const mm = z(date.getMinutes());
  const ss = z(date.getSeconds());
  return `${y}-${m}-${d}T${hh}:${mm}:${ss}`;
}

export const uiConfig = {
  opening: process.env.NEXT_PUBLIC_OPENING ?? "10:00",
  closing: process.env.NEXT_PUBLIC_CLOSING ?? "23:00",
  slotMinutes: Number(process.env.NEXT_PUBLIC_SLOT_MINUTES ?? 15),
};
