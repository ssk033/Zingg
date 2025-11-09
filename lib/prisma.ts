import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["error", "warn"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL + "&pgbouncer=true", // ✅ no env change
      },
    },
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
