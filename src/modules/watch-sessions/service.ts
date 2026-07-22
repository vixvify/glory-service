import { NotFoundError } from "../../core/error";
import { handleServiceError } from "../../core/utils/error/handle-error";
import { MovieRepository } from "../movies/domain/movie.repository";
import { WatchSessionRepository } from "./domain/watch-session.repository";
import {
  CreateWatchSessionBodyDTO,
  WatchSession,
  SeekEvent,
  CompletionType,
} from "./domain/watch-session";
import {
  TZ_OFFSET_MS,
  MAX_WATCHED_SECONDS,
  MAX_PERCENT_WATCHED,
  MAX_SEEK_EVENTS,
} from "./config/watch-session.config";

export class WatchSessionService {
  constructor(
    private repo: WatchSessionRepository,
    private movieRepo: MovieRepository,
  ) {}

  async recordSession(
    dto: CreateWatchSessionBodyDTO,
    userId: string,
  ): Promise<WatchSession> {
    try {
      const movie = await this.movieRepo.findById(dto.movieId);
      if (!movie) {
        throw new NotFoundError(`Movie with id ${dto.movieId} not found`);
      }

      const nowUtc = Date.now();
      const todayStart = new Date(
        Math.floor((nowUtc + TZ_OFFSET_MS) / 86_400_000) * 86_400_000 - TZ_OFFSET_MS,
      );

      const existingSession = await this.repo.findToday({
        userId,
        movieId: dto.movieId,
        source: dto.source,
        todayStart,
      });

      // ── Deduplication: same (userId, movieId, source, day) ───────────────
      if (existingSession) {
        return this.repo.update(existingSession.id, {
          endSecond: Math.max(existingSession.endSecond, dto.endSecond),
          watchedSeconds: Math.min(Math.max(existingSession.watchedSeconds, dto.watchedSeconds), MAX_WATCHED_SECONDS),
          percentWatched: Math.min(Math.max(existingSession.percentWatched, dto.percentWatched), MAX_PERCENT_WATCHED),
          completionType: this.resolveCompletionType(existingSession.completionType, dto.completionType),
          pauseCount: existingSession.pauseCount + dto.pauseCount,
          replayCount: existingSession.replayCount + dto.replayCount,
          seekEvents: [
            ...(existingSession.seekEvents as SeekEvent[]),
            ...dto.seekEvents,
          ].slice(-MAX_SEEK_EVENTS),
        });
      }

      // ── New session: INSERT + increment Movie.views atomically ────────────
      return this.repo.createAndIncrementViews({
        userId,
        movieId: dto.movieId,
        source: dto.source,
        startSecond: dto.startSecond,
        endSecond: dto.endSecond,
        watchedSeconds: Math.min(dto.watchedSeconds, MAX_WATCHED_SECONDS),
        duration: dto.duration,
        percentWatched: Math.min(dto.percentWatched, MAX_PERCENT_WATCHED),
        completionType: dto.completionType,
        pauseCount: dto.pauseCount,
        replayCount: dto.replayCount,
        seekEvents: dto.seekEvents,
      });
    } catch (error: unknown) {
      handleServiceError(error, "Failed to record watch session");
    }
  }

  private resolveCompletionType(
    oldType: CompletionType,
    newType: CompletionType,
  ): CompletionType {
    if (oldType === "completed" || newType === "completed") return "completed";
    if (oldType === "paused" || newType === "paused") return "paused";
    return newType;
  }
}
