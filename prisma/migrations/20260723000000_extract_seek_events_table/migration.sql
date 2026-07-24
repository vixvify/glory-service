-- Drop seekEvents JSONB column from watch_sessions
ALTER TABLE "watch_sessions" DROP COLUMN "seekEvents";

-- CreateTable seek_events
CREATE TABLE "seek_events" (
    "id"             UUID         NOT NULL,
    "watchSessionId" UUID         NOT NULL,
    "time"           DOUBLE PRECISION NOT NULL,
    "direction"      TEXT         NOT NULL,
    "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seek_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "seek_events_watchSessionId_idx" ON "seek_events"("watchSessionId");

-- CreateIndex
CREATE INDEX "seek_events_watchSessionId_time_idx" ON "seek_events"("watchSessionId", "time");

-- AddForeignKey
ALTER TABLE "seek_events" ADD CONSTRAINT "seek_events_watchSessionId_fkey"
    FOREIGN KEY ("watchSessionId")
    REFERENCES "watch_sessions"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;
