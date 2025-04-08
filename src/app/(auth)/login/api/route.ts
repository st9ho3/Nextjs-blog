// app/api/register/route.ts
import { NextResponse } from "next/server";
import { signIn } from "@/app/_db/auth"; // Adjust the import based on your project structure


export async function POST(request: Request) {
console.log("hello")
  try {
    // Parse the JSON reque st body
    const { email, password } = await request.json();

    // You can add server-side validations here if needed

    // Call your Firebase logic to register the user
    const id = await signIn(email, password);
    console.log("Firebase user ID:", id);
    
    return NextResponse.json(
      { message: "User signedIn successfully",
        user: id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login on the server:", error);
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
