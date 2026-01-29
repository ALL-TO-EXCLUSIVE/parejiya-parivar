import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
    // 1. Auth
    const session = await auth.api.getSession({
        headers: req.headers,
    });

    if (!session?.user) {
        return NextResponse.json(
            { success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } },
            { status: 401 }
        );
    }

    const userId = session.user.id;

    // 2. Parse body
    const body = await req.json();
    const { name, villageId, isHead } = body;

    if (
        typeof name !== "string" ||
        name.trim().length < 2 ||
        typeof villageId !== "string" ||
        typeof isHead !== "boolean"
    ) {
        return NextResponse.json(
            { success: false, error: { code: "BAD_REQUEST", message: "Invalid input" } },
            { status: 400 }
        );
    }

    // 3. Ensure village exists
    const village = await prisma.village.findUnique({
        where: { id: villageId },
    });

    if (!village) {
        return NextResponse.json(
            { success: false, error: { code: "INVALID_VILLAGE", message: "Village not found" } },
            { status: 400 }
        );
    }

    // 4. Check existing member
    const existingMember = await prisma.member.findUnique({
        where: { userId },
    });

    if (existingMember?.profileCompleted) {
        return NextResponse.json(
            { success: false, error: { code: "ALREADY_ONBOARDED", message: "Profile already completed" } },
            { status: 409 }
        );
    }

    // 5. Transaction (important)
    await prisma.$transaction(async (tx) => {
        let member = existingMember;

        if (!member) {
            member = await tx.member.create({
                data: {
                    userId,
                    name: name.trim(),
                    villageId,
                    isHead,
                },
            });
        } else {
            member = await tx.member.update({
                where: { id: member.id },
                data: {
                    name: name.trim(),
                    villageId,
                    isHead,
                },
            });
        }

        // 6. If head → create family
        if (isHead) {
            const family = await tx.family.create({
                data: {
                    name: `${name.trim()}'s Family`,
                    headId: member.id,
                    villageId,
                },
            });

            await tx.member.update({
                where: { id: member.id },
                data: {
                    familyId: family.id,
                    relationToHead: "HEAD",
                },
            });
        }

        // 7. Mark profile completed
        await tx.member.update({
            where: { id: member.id },
            data: {
                profileCompleted: true,
            },
        });
    });

    return NextResponse.json({
        success: true,
        data: { completed: true },
    });
}
