-- CreateTable
CREATE TABLE "watch_sessions" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "source" TEXT NOT NULL,
    "startSecond" DOUBLE PRECISION NOT NULL,
    "endSecond" DOUBLE PRECISION NOT NULL,
    "watchedSeconds" DOUBLE PRECISION NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "percentWatched" DOUBLE PRECISION NOT NULL,
    "completionType" TEXT NOT NULL,
    "pauseCount" INTEGER NOT NULL DEFAULT 0,
    "replayCount" INTEGER NOT NULL DEFAULT 0,
    "seekEvents" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watch_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "watch_sessions_userId_idx" ON "watch_sessions"("userId");

-- CreateIndex
CREATE INDEX "watch_sessions_movieId_idx" ON "watch_sessions"("movieId");

-- CreateIndex
CREATE INDEX "watch_sessions_userId_movieId_source_idx" ON "watch_sessions"("userId", "movieId", "source");

-- AddForeignKey
ALTER TABLE "watch_sessions" ADD CONSTRAINT "watch_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch_sessions" ADD CONSTRAINT "watch_sessions_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

