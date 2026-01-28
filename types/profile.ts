// types/profile.ts
import { Gender, RelationToHead } from "./enums";

/**
 * Returned by GET /me
 */
export type MyProfile = {
    id: string;

    name: string;
    email: string;

    gender: Gender | null;
    dob: string | null;
    phone: string | null;
    education: string | null;
    address: string | null;

    job: string | null;
    business: string | null;

    isHead: boolean;
    isActive: boolean;
    profileCompleted: boolean;

    familyId: string | null;
    villageId: string | null;
    relationToHead: RelationToHead | null;

    createdAt: string;
    updatedAt: string;
};
