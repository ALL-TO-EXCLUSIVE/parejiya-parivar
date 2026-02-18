import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const villages = await prisma.village.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: "asc",
            },
        });

        return NextResponse.json({
            success: true,
            data: villages,
        });
    } catch (error) {
        console.error("VILLAGE_FETCH_ERROR", error);

        return NextResponse.json(
            {
                success: false,
                error: {
                    code: "SERVER_ERROR",
                    message: "Failed to fetch villages",
                },
            },
            { status: 500 }
        );
    }
}
