import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ POST (Create Blog)
export async function POST(req: Request) {
  try {
    const { title, content, authorID } = await req.json();

    if (!title || !content || !authorID) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const blog = await prisma.blog.create({
      data: { title, content, authorID },
    });

    return NextResponse.json({ message: "Blog created ✅", blog }, { status: 201 });
  } catch (error) {
    console.error("🔥 Prisma Error (POST):", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ GET (Fetch all blogs)
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: { author: true },  // fetch author details
      orderBy: { id: "desc" },    // latest first
    });

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error("🔥 Prisma Error (GET):", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
