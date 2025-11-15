-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "mediaUrls" TEXT[] DEFAULT ARRAY[]::TEXT[];
