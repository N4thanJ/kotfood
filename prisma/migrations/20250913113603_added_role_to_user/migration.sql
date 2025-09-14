-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('User', 'Admin');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'User';
