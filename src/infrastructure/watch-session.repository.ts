import { prisma } from "../lib/prisma";
import { WatchSessionRepository } from "../modules/watch-sessions/domain/watch-session.repository";
import {
  CreateWatchSessionInput,
  FindTodaySessionInput,
  UpdateWatchSessionInput,
  WatchSession,
} from "../modules/watch-sessions/domain/watch-session";

export class WatchSessionRepositoryImpl implements WatchSessionRepository {
  async findToday(input: FindTodaySessionInput): Promise<WatchSession | null> {
    const { userId, movieId, source, todayStart } = input;

    const session = await prisma.watchSession.findFirst({
      where: {
        userId,
        movieId,
        source,
        createdAt: { gte: todayStart },
      },
    });

    return session as WatchSession | null;
  }

  async createAndIncrementViews(input: CreateWatchSessionInput): Promise<WatchSession> {
    const [session] = await prisma.$transaction([
      prisma.watchSession.create({
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
          seekEvents: input.seekEvents,
        },
      }),
      prisma.movie.update({
        where: { id: input.movieId },
        data: { views: { increment: 1 } },
      }),
    ]);

    return session as WatchSession;
  }

  async update(id: string, input: UpdateWatchSessionInput): Promise<WatchSession> {
    const session = await prisma.watchSession.update({
      where: { id },
      data: {
        endSecond: input.endSecond,
        watchedSeconds: input.watchedSeconds,
        percentWatched: input.percentWatched,
        completionType: input.completionType,
        pauseCount: input.pauseCount,
        replayCount: input.replayCount,
        seekEvents: input.seekEvents,
      },
    });

    return session as WatchSession;
  }
}
