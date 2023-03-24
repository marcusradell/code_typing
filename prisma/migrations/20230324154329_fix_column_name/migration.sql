/*
  Warnings:

  - You are about to drop the column `email` on the `ChallangeRow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ChallangeRow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `ChallangeRow` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ChallangeRow_email_key";

-- AlterTable
ALTER TABLE "ChallangeRow" DROP COLUMN "email",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ChallangeRow_name_key" ON "ChallangeRow"("name");
