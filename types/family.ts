// types/family.ts
import { RelationToHead } from "./enums";
import { Member } from "./member";

export type FamilyMember = Member & {
    relationToHead: RelationToHead;
};

export type Family = {
    id: string;
    name: string;
    headId: string;
    villageId: string;

    members: FamilyMember[];

    createdAt: string;
    updatedAt: string;
};
