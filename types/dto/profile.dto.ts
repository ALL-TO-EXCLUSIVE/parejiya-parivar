// types/dto/profile.dto.ts
import { Gender } from "../enums";

/**
 * Used when user fills profile after Google login
 * POST /profile/complete
 */
export type CompleteProfileInput = {
    name: string;

    gender?: Gender;
    dob?: string; // ISO string
    phone: string;
    education?: string;
    address: string;

    villageId: string;
};

/**
 * Used for PATCH /users/me
 */
export type UpdateProfileInput = {
    name?: string;
    gender?: Gender;
    dob?: string;
    phone?: string;
    education?: string;
    address?: string;

    job?: string;
    business?: string;
};
