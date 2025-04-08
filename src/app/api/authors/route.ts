
import { NextResponse } from "next/server";
import { getAllAuthors } from "@/app/_db/services";

export const GET = async () => {
    try {
        // Fetch all authors from Firestore
        const authors = await getAllAuthors();

        // Return the authors as a JSON response
        return NextResponse.json(authors);
    } catch (error) {
        // Log the error if the data couldn't be fetched
        console.error("Couldn't fetch data", error);
    }
};
/* export async function getAuthorsData(): Promise<Author[]> {
    const res = await fetch('http://localhost:3000/api/authors', {
      cache: 'force-cache',
      next: {revalidate: 60}
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json();
  } */
