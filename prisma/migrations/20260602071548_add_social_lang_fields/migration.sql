/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `crew_members` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "crew_members" ADD COLUMN     "email" TEXT,
ADD COLUMN     "userId" UUID;

-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "email" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "targetGroup" TEXT;

-- CreateTable
CREATE TABLE "languages" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "target_groups" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "target_groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "languages_name_key" ON "languages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "target_groups_name_key" ON "target_groups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "crew_members_email_key" ON "crew_members"("email");

-- AddForeignKey
ALTER TABLE "crew_members" ADD CONSTRAINT "crew_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
