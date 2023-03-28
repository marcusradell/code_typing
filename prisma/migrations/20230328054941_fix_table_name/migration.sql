/*
  Warnings:

  - You are about to drop the `ChallangeRow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ChallangeRow";

-- CreateTable
CREATE TABLE "ChallengeRow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "ChallengeRow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeRow_name_key" ON "ChallengeRow"("name");
