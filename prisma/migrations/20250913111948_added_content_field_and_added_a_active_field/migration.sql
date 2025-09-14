-- AlterTable
ALTER TABLE "public"."Recipe" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "content" TEXT;
