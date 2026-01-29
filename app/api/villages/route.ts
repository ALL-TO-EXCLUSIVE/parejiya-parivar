import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const villages = await prisma.village.findMany({
        orderBy: { name: "asc" },
        select: {
            id: true,
            name: true,
        },
    });

    return NextResponse.json({
        success: true,
        data: villages,
    });
}
