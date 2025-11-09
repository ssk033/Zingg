import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, username, email, password } = await req.json();

  if (!name || !username || !email || !password)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });

  const exists = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (exists)
    return NextResponse.json({ error: "User already exists" }, { status: 409 });

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, username, email, password: hashed, provider: "credentials" },
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
