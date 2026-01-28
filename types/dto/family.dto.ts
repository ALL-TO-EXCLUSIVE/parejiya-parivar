// types/dto/family.dto.ts

/**
 * Used when HEAD confirms family creation
 * POST /family
 */
export type CreateFamilyInput = {
    familyName: string;
};

export type HeadDecisionInput = {
    wantsToCreateFamily: boolean;
};