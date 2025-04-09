// src/app/api/[userId]/route.ts
import { NextResponse } from "next/server";
import { getAuthorById } from "@/app/_db/services";

export async function GET(
    request: Request
) {
    console.log("Fetching user data...");
    console.log(request.url);
    const userId = new URL(request.url).pathname.slice(5)
    if (!userId) {
        return NextResponse.json({ message: "User ID required" }, { status: 400 });
    }
    try {
        const author = await getAuthorById(userId);
        if (!author) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json(author);
    } catch (error) {
        console.error(`API Error fetching user ${userId}:`, error);
        return NextResponse.json({ message: "Failed to fetch user data" }, { status: 500 });
    }
}