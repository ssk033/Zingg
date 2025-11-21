import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

/**
 * Create a new blog post
 * Supports both multipart/form-data (with file uploads) and JSON formats.
 * Converts uploaded files to base64 data URLs for storage.
 */
export async function POST(req: Request) {
  try {
    // Validate session on server side
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type");
    
    let title: string;
    let content: string;
    let authorID: string;
    let files: File[] = [];

    if (contentType?.includes("multipart/form-data")) {
      // Handle FormData (with file uploads)
      const formData = await req.formData();
      title = formData.get("title") as string;
      content = formData.get("content") as string;
      authorID = formData.get("authorID") as string;
      
      // Extract files
      const fileEntries = formData.getAll("files");
      files = fileEntries.filter((file): file is File => file instanceof File);
    } else {
      // Handle JSON (backward compatibility)
      const body = await req.json();
      title = body.title;
      content = body.content;
      authorID = body.authorID;
    }

    if (!title?.trim() || !content?.trim() || !authorID) {
      return NextResponse.json(
        { error: "Missing required fields: title, content, authorID" },
        { status: 400 }
      );
    }

    // Verify that the authorID matches the session user (security check)
    if (authorID !== session.user.id) {
      return NextResponse.json(
        { error: "You can only create blogs for yourself" },
        { status: 403 }
      );
    }

    // Verify that the author exists in the database
    const author = await prisma.user.findUnique({
      where: { id: authorID },
      select: { id: true },
    });

    if (!author) {
      return NextResponse.json(
        { error: "Author not found" },
        { status: 404 }
      );
    }

    // Convert files to base64 data URLs for storage
    const mediaUrls: string[] = [];
    if (files.length > 0) {
      for (const file of files) {
        // Validate file size (max 10MB for images, 50MB for videos)
        const maxSize = file.type.startsWith("video/") ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
        if (file.size > maxSize) {
          return NextResponse.json(
            { error: `File "${file.name}" is too large. Max size: ${maxSize / (1024 * 1024)}MB` },
            { status: 400 }
          );
        }

        try {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64 = buffer.toString("base64");
          const dataUrl = `data:${file.type};base64,${base64}`;
          mediaUrls.push(dataUrl);
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          return NextResponse.json(
            { error: `Failed to process file "${file.name}". Please try a smaller file.` },
            { status: 400 }
          );
        }
      }
      console.log(`Processed ${files.length} file(s) for blog`);
    }

    // Extract @ mentions from content
    const mentionRegex = /@(\w+)/g;
    const mentionMatches = content.matchAll(mentionRegex);
    const mentions = Array.from(mentionMatches, (match) => match[1]);

    // Find users by username (only if there are mentions)
    let taggedUsers: { id: string }[] = [];
    if (mentions.length > 0) {
      taggedUsers = await prisma.user.findMany({
        where: {
          username: { in: mentions },
        },
        select: { id: true },
      });
    }

    // Create blog with tags (only if there are tagged users)
    const blog = await prisma.blog.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        authorID,
        mediaUrls,
        ...(taggedUsers.length > 0 && {
          tags: {
            create: taggedUsers.map((user) => ({
              userId: user.id,
            })),
          },
        }),
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    console.error("❌ POST /api/blog Error:", err);
    
    // Provide more specific error messages
    if (err instanceof Error) {
      // Check for Prisma errors
      if (err.message.includes("Foreign key constraint")) {
        return NextResponse.json(
          { error: "Invalid author or user reference" },
          { status: 400 }
        );
      }
      if (err.message.includes("Unique constraint")) {
        return NextResponse.json(
          { error: "A blog with this information already exists" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: err.message || "Server error" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

/**
 * Retrieve all blog posts
 * Returns blogs with author information and like/comment counts.
 * Ordered by creation date (newest first).
 */
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: { id: true, username: true, name: true, image: true },
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

/**
 * Delete a blog post
 * Only the blog author can delete their own posts.
 * Cascades deletion of associated likes and comments.
 */
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("blogId");

    if (!blogId) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const blogIdNum = Number(blogId);
    if (isNaN(blogIdNum)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    // Check if blog exists and user is the author
    const blog = await prisma.blog.findUnique({
      where: { id: blogIdNum },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (blog.authorID !== session.user.id) {
      return NextResponse.json({ error: "You can only delete your own blogs" }, { status: 403 });
    }

    // Delete related records first (likes and comments)
    // This is necessary because schema doesn't have cascade delete
    await prisma.like.deleteMany({
      where: { blogId: blogIdNum },
    });

    await prisma.comment.deleteMany({
      where: { blogId: blogIdNum },
    });

    // Now delete the blog
    await prisma.blog.delete({
      where: { id: blogIdNum },
    });

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("❌ DELETE /api/blog Error:", err);
    const errorMessage = err instanceof Error ? err.message : "Server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
