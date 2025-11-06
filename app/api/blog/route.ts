import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: { json: () => any; }) {
  try {
    const body = await req.json();
    const { title, content, authorID } = body;

    if (!title || !content || !authorID) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    return NextResponse.json(
      {
        message: "Blog created successfully",
        blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Blog create error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
