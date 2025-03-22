import { NextResponse } from "next/server";
import { getArticles } from "@/app/_lib/utils";

/**
 * @description Retrieves all articles from Firestore.
 * @async
 * @function getArticles
 * @returns {Promise<object[]>} A promise that resolves to an array of article data objects.
 * @throws {Error} Throws an error if the document retrieval fails.
 */


export const GET = async (request: Request) => {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")
    const totalArticles = await getArticles()

    if (id) {
        const article = totalArticles.find((art) => art.id === id);
        if(!article) {
            return NextResponse.json({error:"Article not found"}, {status: 404})
        }
        return NextResponse.json(article)
    }
    return NextResponse.json(totalArticles)
}

