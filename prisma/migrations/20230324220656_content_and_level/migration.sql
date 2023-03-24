/*
  Warnings:

  - Added the required column `content` to the `ChallangeRow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `ChallangeRow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChallangeRow" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "level" INTEGER NOT NULL;
