import { prisma } from "../lib/prisma";
import { WatchSessionRepository } from "../modules/watch-sessions/domain/watch-session.repository";
import {
  CompletionType,
  CreateWatchSessionInput,
  FindTodaySessionInput,
  SeekEvent,
  UpdateWatchSessionInput,
  WatchSession,
} from "../modules/watch-sessions/domain/watch-session";

// ─── Prisma Row Types ─────────────────────────────────────────────────────────

interface PrismaSeekEventRow {
  id: string;
  watchSessionId: string;
  seekFrom: number;
  seekTo: number;
  createdAt: Date;
}

interface PrismaWatchSessionRow {
  id: string;
  userId: string;
  movieId: string;
  source: string;
  startSecond: number;
  endSecond: number;
  watchedSeconds: number;
  duration: number;
  percentWatched: number;
  completionType: string;
  pauseCount: number;
  replayCount: number;
  createdAt: Date;
  seekEvents: PrismaSeekEventRow[];
}

// ─── Repository Implementation ────────────────────────────────────────────────

export class WatchSessionRepositoryImpl implements WatchSessionRepository {
  private mapSeekEvents(events: PrismaSeekEventRow[]): SeekEvent[] {
    return events.map((e) => ({
      seekFrom: e.seekFrom,
      seekTo: e.seekTo,
    }));
  }

  private mapToDomain(session: PrismaWatchSessionRow): WatchSession {
    return {
      id: session.id,
      userId: session.userId,
      movieId: session.movieId,
      source: session.source,
      startSecond: session.startSecond,
      endSecond: session.endSecond,
      watchedSeconds: session.watchedSeconds,
      duration: session.duration,
      percentWatched: session.percentWatched,
      completionType: session.completionType as CompletionType,
      pauseCount: session.pauseCount,
      replayCount: session.replayCount,
      seekEvents: this.mapSeekEvents(session.seekEvents),
      createdAt: session.createdAt,
    };
  }

  async findToday(input: FindTodaySessionInput): Promise<WatchSession | null> {
    const { userId, movieId, source, todayStart } = input;

    const session = await prisma.watchSession.findFirst({
      where: {
        userId,
        movieId,
        source,
        createdAt: { gte: todayStart },
      },
      include: {
        seekEvents: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!session) return null;
    return this.mapToDomain(session);
  }

  async createAndIncrementViews(
    input: CreateWatchSessionInput,
  ): Promise<WatchSession> {
    const session = await prisma.$transaction(async (tx) => {
      const created = await tx.watchSession.create({
        data: {
          userId: input.userId,
          movieId: input.movieId,
          source: input.source,
          startSecond: input.startSecond,
          endSecond: input.endSecond,
          watchedSeconds: input.watchedSeconds,
          duration: input.duration,
          percentWatched: input.percentWatched,
          completionType: input.completionType,
          pauseCount: input.pauseCount,
          replayCount: input.replayCount,
          seekEvents: {
            create: input.seekEvents.map((e) => ({
              seekFrom: e.seekFrom,
              seekTo: e.seekTo,
            })),
          },
        },
        include: {
          seekEvents: { orderBy: { createdAt: "asc" } },
        },
      });

      await tx.movie.update({
        where: { id: input.movieId },
        data: { views: { increment: 1 } },
      });

      return created;
    });

    return this.mapToDomain(session);
  }

  async update(id: string, input: UpdateWatchSessionInput): Promise<WatchSession> {
    const session = await prisma.$transaction(async (tx) => {
      // Delete existing seek events (service has already merged + capped to 100)
      await tx.seekEvent.deleteMany({ where: { watchSessionId: id } });

      return tx.watchSession.update({
        where: { id },
        data: {
          endSecond: input.endSecond,
          watchedSeconds: input.watchedSeconds,
          percentWatched: input.percentWatched,
          completionType: input.completionType,
          pauseCount: input.pauseCount,
          replayCount: input.replayCount,
          seekEvents: {
            create: input.seekEvents.map((e) => ({
              seekFrom: e.seekFrom,
              seekTo: e.seekTo,
            })),
          },
        },
        include: {
          seekEvents: { orderBy: { createdAt: "asc" } },
        },
      });
    });

    return this.mapToDomain(session);
  }
}
