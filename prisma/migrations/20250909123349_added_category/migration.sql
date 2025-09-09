-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('Ontbijt', 'Lunch', 'Diner', 'Dessert', 'Snack', 'Drankje');

-- AlterTable
ALTER TABLE "public"."Recipe" ADD COLUMN     "category" "public"."Category" NOT NULL DEFAULT 'Dessert';
