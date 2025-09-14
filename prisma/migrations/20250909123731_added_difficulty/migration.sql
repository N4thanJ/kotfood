-- CreateEnum
CREATE TYPE "public"."Difficulty" AS ENUM ('Makkelijk', 'Gemiddeld', 'Moeilijk');

-- AlterTable
ALTER TABLE "public"."Recipe" ADD COLUMN     "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'Makkelijk';
