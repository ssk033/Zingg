import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;        // ✅ STRING (matches Prisma schema)
    username: string;
  }

  interface Session {
    user: {
      id: string;      // ✅ FIXED HERE
      username: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;        // ✅ JWT stores id as string
    username: string;
  }
}
