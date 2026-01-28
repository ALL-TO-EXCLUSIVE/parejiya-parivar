// types/dto/auth.dto.ts

/**
 * Internal mapping after Better Auth login
 */
export type AuthCallbackInput = {
    provider: "google";
    accessToken: string;
};
