// types/member.ts
import { Gender } from "./enums";

/**
 * Core member entity as returned by backend
 * NEVER used for forms directly
 */
export type Member = {
    id: string;

    name: string;
    email: string | null;

    gender: Gender | null;
    dob: string | null;
    phone: string | null;
    education: string | null;

    job: string | null;
    business: string | null;
    address: string | null;

    isHead: boolean;
    isActive: boolean;

    familyId: string | null;
    villageId: string | null;

    createdAt: string;
    updatedAt: string;
};
