import { Gender, RelationToHead } from "./enums";
import { Village } from "./village";

/**
 * Returned by GET /me
 * Server-safe profile DTO
 */
export type MyProfile = {
    id: string;

    name: string;
    email: string | null;

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
    family: {
        id: string;
        name: string;
        headId: string;
        villageId: string;
    } | null;

    villageId: string | null;
    village: Village | null;

    relationToHead: RelationToHead | null;

    createdAt: string;
    updatedAt: string;
};
