// types/dto/member.dto.ts
import { Gender, RelationToHead } from "../enums";

/**
 * Used by HEAD only
 * POST /family/members
 */
export type AddFamilyMemberInput = {
    name: string;
    relationToHead: RelationToHead;

    email?: string;
    phone?: string;

    gender?: Gender;
    dob?: string;

    education?: string;
    job?: string;
    business?: string;
    address?: string;
};
