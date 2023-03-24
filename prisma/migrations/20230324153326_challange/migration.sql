-- CreateTable
CREATE TABLE "ChallangeRow" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "ChallangeRow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChallangeRow_email_key" ON "ChallangeRow"("email");
