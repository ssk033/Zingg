import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ CREATE BLOG (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, authorID } = body;

    if (!title?.trim() || !content?.trim() || !authorID) {
      return NextResponse.json(
        { error: "Missing required fields: title, content, authorID" },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorID,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    console.error("❌ POST /api/blog Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ GET ALL BLOGS (FETCH)
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: { username: true, name: true, image: true },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (err) {
    console.error("❌ GET /api/blog Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
