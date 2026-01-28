// types/auth.ts

export type AuthUser = {
    id: string;          // auth provider id
    email: string;
    name: string;
    avatarUrl?: string | null;
};
