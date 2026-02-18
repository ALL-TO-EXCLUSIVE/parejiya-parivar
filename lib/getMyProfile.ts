import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { MyProfile } from "@/types/profile";
import { headers } from "next/headers";

export async function getMyProfile(): Promise<MyProfile | null> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return null;
    const member = await prisma.member.findUnique({
        where: { userId: session.user.id },
        include: {
            village: true,
            family: true,
        },
    });
    if (!member) return null;

    return {
        id: member.id,
        name: member.name,
        email: member.email,

        gender: member.gender,
        dob: member.dob ? member.dob.toISOString() : null,
        phone: member.phone,
        education: member.education,
        address: member.address,

        job: member.job,
        business: member.business,

        isHead: member.isHead,
        isActive: member.isActive,
        profileCompleted: member.profileCompleted,

        familyId: member.familyId,
        family: member.family
            ? {
                id: member.family.id,
                name: member.family.name,
                headId: member.family.headId,
                villageId: member.family.villageId,
            }
            : null,

        villageId: member.villageId,
        village: member.village
            ? {
                id: member.village.id,
                name: member.village.name,
            }
            : null,

        relationToHead: member.relationToHead,

        createdAt: member.createdAt.toISOString(),
        updatedAt: member.updatedAt.toISOString(),
    };

}
