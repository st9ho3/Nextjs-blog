
import { NextResponse } from "next/server";
import { getAuthors } from "@/app/_lib/utils";



export const GET = async () => {
    try {
        // Fetch the list of authors
        const authors: Author[] = await getAuthors();

        // Return the authors as a JSON response
        return NextResponse.json(authors);
    } catch (error) {
        // Log the error if the data couldn't be fetched
        console.error("Couldn't fetch data", error);
    }
};
