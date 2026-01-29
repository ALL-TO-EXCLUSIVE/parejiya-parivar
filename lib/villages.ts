import { Village } from "@/types/village";

export async function getVillages(): Promise<Village[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/villages`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch villages");
    }

    const json = await res.json();
    return json.data;
}
