//types/onboarding.ts
import { Gender } from "./enums";

export type OnboardingFormValues = {
    name: string;
    gender: Gender;
    dob: Date;
    phone: string;
    address: string;
    education: string;
    villageId: string;
    isHead: boolean;
}

export type InitialOnboardingValues = {
    name: string;
    villageId: string;
    isHead: boolean;
};