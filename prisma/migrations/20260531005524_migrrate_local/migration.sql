/*
  Warnings:

  - You are about to drop the column `btsPhotos` on the `movie_crews` table. All the data in the column will be lost.
  - You are about to drop the column `btsVideo` on the `movie_crews` table. All the data in the column will be lost.
  - You are about to drop the column `cast` on the `movie_crews` table. All the data in the column will be lost.
  - You are about to drop the column `director` on the `movie_crews` table. All the data in the column will be lost.
  - You are about to drop the column `producer` on the `movie_crews` table. All the data in the column will be lost.
  - You are about to drop the column `writer` on the `movie_crews` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[movieId,crewMemberId,role]` on the table `movie_crews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `crewMemberId` to the `movie_crews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `movie_crews` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "movie_crews_movieId_key";

-- AlterTable
ALTER TABLE "movie_crews" DROP COLUMN "btsPhotos",
DROP COLUMN "btsVideo",
DROP COLUMN "cast",
DROP COLUMN "director",
DROP COLUMN "producer",
DROP COLUMN "writer",
ADD COLUMN     "crewMemberId" UUID NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "crew_members" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crew_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_bts" (
    "id" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "btsVideo" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "btsPhotos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movie_bts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "universities" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "universities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "age_ratings" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "age_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "crew_members_name_key" ON "crew_members"("name");

-- CreateIndex
CREATE UNIQUE INDEX "movie_bts_movieId_key" ON "movie_bts"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "universities_name_key" ON "universities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "age_ratings_name_key" ON "age_ratings"("name");

-- CreateIndex
CREATE UNIQUE INDEX "movie_crews_movieId_crewMemberId_role_key" ON "movie_crews"("movieId", "crewMemberId", "role");

-- CreateIndex
CREATE INDEX "movies_category_idx" ON "movies"("category");

-- CreateIndex
CREATE INDEX "movies_university_idx" ON "movies"("university");

-- CreateIndex
CREATE INDEX "movies_title_idx" ON "movies"("title");

-- AddForeignKey
ALTER TABLE "movie_crews" ADD CONSTRAINT "movie_crews_crewMemberId_fkey" FOREIGN KEY ("crewMemberId") REFERENCES "crew_members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_bts" ADD CONSTRAINT "movie_bts_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
