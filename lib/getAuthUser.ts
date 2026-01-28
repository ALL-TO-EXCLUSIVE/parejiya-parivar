//lib/getAuthUser.ts

import { AuthUser } from "@/types/auth";
import { auth } from "./auth";
import { headers } from "next/headers";

export const getAuthUser = async (): Promise<AuthUser | null> => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session?.user) return null;

    return {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        avatarUrl: session.user.image,
    }
}