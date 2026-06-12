/*
  Warnings:

  - You are about to drop the column `photoUrl` on the `crew_members` table. All the data in the column will be lost.
  - The primary key for the `favorites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `movie_crews` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `facebook` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `targetGroup` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `university` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `movies` table. All the data in the column will be lost.
  - The primary key for the `ratings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ratings` table. All the data in the column will be lost.
  - You are about to drop the `age_ratings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movie_bts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `target_groups` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `crew_members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[movieId,crewMemberId,roleId]` on the table `movie_crews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdBy` to the `crew_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `movie_crews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorType` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "movie_bts" DROP CONSTRAINT "movie_bts_movieId_fkey";

-- DropIndex
DROP INDEX "favorites_userId_movieId_key";

-- DropIndex
DROP INDEX "movie_crews_movieId_crewMemberId_role_key";

-- DropIndex
DROP INDEX "movies_category_idx";

-- DropIndex
DROP INDEX "movies_university_idx";

-- DropIndex
DROP INDEX "ratings_userId_movieId_key";

-- AlterTable
ALTER TABLE "crew_members" DROP COLUMN "photoUrl",
ADD COLUMN     "createdBy" UUID NOT NULL;

-- AlterTable
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "favorites_pkey" PRIMARY KEY ("userId", "movieId");

-- AlterTable
ALTER TABLE "movie_crews" DROP COLUMN "role",
ADD COLUMN     "roleId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "category",
DROP COLUMN "email",
DROP COLUMN "facebook",
DROP COLUMN "instagram",
DROP COLUMN "language",
DROP COLUMN "targetGroup",
DROP COLUMN "university",
DROP COLUMN "year",
ADD COLUMN     "aspectRatio" TEXT NOT NULL DEFAULT 'landscape',
ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "awards" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "btsVideos" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "categoryId" UUID NOT NULL,
ADD COLUMN     "colorType" TEXT NOT NULL,
ADD COLUMN     "createdBy" UUID NOT NULL,
ADD COLUMN     "hasDrugs" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasProfanity" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "languageId" UUID,
ADD COLUMN     "releaseDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "schoolId" UUID,
ADD COLUMN     "studio" TEXT,
ADD COLUMN     "trailerUrl" TEXT,
ADD COLUMN     "universityId" UUID,
ALTER COLUMN "ageRating" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_pkey",
DROP COLUMN "id",
ADD COLUMN     "comment" TEXT,
ADD CONSTRAINT "ratings_pkey" PRIMARY KEY ("userId", "movieId");

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "age_ratings";

-- DropTable
DROP TABLE "movie_bts";

-- DropTable
DROP TABLE "target_groups";

-- CreateTable
CREATE TABLE "schools" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crew_roles" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crew_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schools_name_key" ON "schools"("name");

-- CreateIndex
CREATE UNIQUE INDEX "crew_roles_name_key" ON "crew_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "crew_members_userId_key" ON "crew_members"("userId");

-- CreateIndex
CREATE INDEX "crew_members_userId_idx" ON "crew_members"("userId");

-- CreateIndex
CREATE INDEX "crew_members_createdBy_idx" ON "crew_members"("createdBy");

-- CreateIndex
CREATE INDEX "favorites_movieId_idx" ON "favorites"("movieId");

-- CreateIndex
CREATE INDEX "movie_crews_crewMemberId_idx" ON "movie_crews"("crewMemberId");

-- CreateIndex
CREATE INDEX "movie_crews_roleId_idx" ON "movie_crews"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "movie_crews_movieId_crewMemberId_roleId_key" ON "movie_crews"("movieId", "crewMemberId", "roleId");

-- CreateIndex
CREATE INDEX "movies_categoryId_idx" ON "movies"("categoryId");

-- CreateIndex
CREATE INDEX "movies_universityId_idx" ON "movies"("universityId");

-- CreateIndex
CREATE INDEX "movies_schoolId_idx" ON "movies"("schoolId");

-- CreateIndex
CREATE INDEX "movies_createdBy_idx" ON "movies"("createdBy");

-- CreateIndex
CREATE INDEX "movies_languageId_idx" ON "movies"("languageId");

-- CreateIndex
CREATE INDEX "ratings_movieId_idx" ON "ratings"("movieId");

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "universities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crew_members" ADD CONSTRAINT "crew_members_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_crews" ADD CONSTRAINT "movie_crews_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "crew_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
