export async function api<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(url, {
        ...options,
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });

    if (!res.ok) throw new Error("API error");

    return res.json();
}
