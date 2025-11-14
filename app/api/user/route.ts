import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, username, email, password } = await req.json();

    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const exists = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (exists) {
      if (exists.email === email) {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }
      if (exists.username === username) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 409 }
        );
      }
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: { name, username, email, password: hashed, provider: "credentials" },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("❌ POST /api/user Error:", err);
    const errorMessage = err instanceof Error ? err.message : "Server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
