-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "contentWarnings" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "otherContentWarning" TEXT,
ADD COLUMN     "subtitle" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "trailerUrls" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Data Migration
UPDATE "movies" SET "trailerUrls" = ARRAY["trailerUrl"] WHERE "trailerUrl" IS NOT NULL AND "trailerUrl" != '';

UPDATE "movies" SET "contentWarnings" = array_append("contentWarnings", 'PROFANITY') WHERE "hasProfanity" = true;
UPDATE "movies" SET "contentWarnings" = array_append("contentWarnings", 'DRUGS') WHERE "hasDrugs" = true;

-- AlterTable (Drop Legacy Columns)
ALTER TABLE "movies" DROP COLUMN "trailerUrl",
DROP COLUMN "hasProfanity",
DROP COLUMN "hasDrugs";
