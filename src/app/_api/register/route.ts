// app/api/register/route.ts
import { NextResponse } from "next/server";
import { registerUser } from "@/app/db/auth"; // Adjust the import based on your project structure

export async function POST(request: Request) {
  try {
    // Parse the JSON request body
    const { name, email, password } = await request.json();

    // You can add server-side validations here if needed

    // Call your Firebase logic to register the user
    await registerUser(email, password, name);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during registration on the server:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
