// app/api/register/route.ts
import { NextResponse } from "next/server";
import { registerUser } from "@/app/_db/auth"; // Adjust the import based on your project structure

export async function POST(request: Request) {
console.log("hello")
  try {
    // Parse the JSON reque st body
    const { name, email, password } = await request.json();

    // You can add server-side validations here if needed

    // Call your Firebase logic to register the user
    const id = await registerUser(email, password, name);
    
    return NextResponse.json(
      { message: "User registered successfully",
        user: id
      },
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
