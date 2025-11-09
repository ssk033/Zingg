import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ POST (Create Blog)
export async function POST(req: Request) {
  try {
    const { title, content, authorID } = await req.json();

    if (!title || !content || authorID === undefined || authorID === null) {
      return NextResponse.json(
        { error: "Missing required fields: title, content, authorID" },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title: String(title).trim(),
        content: String(content).trim(),
        authorID: Number(authorID), // ✅ critical fix
        // published defaults to false via schema
        // createdAt defaults via schema
      },
    });

    // Return created object directly (simpler for client)
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    console.error("🔥 Prisma Error (POST /api/blog):", error);
    // Bubble up prisma validation messages when safe
    const msg =
      typeof error?.message === "string" && error.message.length < 200
        ? error.message
        : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
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
    console.error("🔥 Prisma Error (GET /api/blog):", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
