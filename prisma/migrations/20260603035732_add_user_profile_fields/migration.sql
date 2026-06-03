-- AlterTable
ALTER TABLE "users" ADD COLUMN     "awards" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "birthday" TIMESTAMP(3),
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "ig" TEXT,
ADD COLUMN     "motto" TEXT,
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "positions" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "tiktok" TEXT,
ADD COLUMN     "youtube" TEXT;
