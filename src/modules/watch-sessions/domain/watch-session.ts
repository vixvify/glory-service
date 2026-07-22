import { t, Static } from "elysia";

// ─── Domain Type ─────────────────────────────────────────────────────────────

export type CompletionType = "completed" | "paused" | "abandoned";

export interface SeekEvent {
  time: number;
  direction: "forward" | "backward";
}

export interface WatchSession {
  id: string;
  userId: string;
  movieId: string;
  source: string;
  startSecond: number;
  endSecond: number;
  watchedSeconds: number;
  duration: number;
  percentWatched: number;
  completionType: CompletionType;
  pauseCount: number;
  replayCount: number;
  seekEvents: SeekEvent[];
  createdAt: Date;
}

// ─── Validation Schemas ───────────────────────────────────────────────────────

export const seekEventSchema = t.Object({
  time: t.Number({ minimum: 0 }),
  direction: t.Union([t.Literal("forward"), t.Literal("backward")]),
});

export const createWatchSessionBodySchema = t.Object({
  movieId: t.String({ format: "uuid" }),
  source: t.Union([
    t.Literal("main_movie"),
    t.Literal("trailer"),
    t.Literal("bts"),
  ]),
  startSecond: t.Number({ minimum: 0 }),
  endSecond: t.Number({ minimum: 0 }),
  watchedSeconds: t.Number({ minimum: 0 }),
  duration: t.Number({ minimum: 0 }),
  percentWatched: t.Number({ minimum: 0 }),
  completionType: t.Union([
    t.Literal("completed"),
    t.Literal("paused"),
    t.Literal("abandoned"),
  ]),
  pauseCount: t.Number({ minimum: 0, default: 0 }),
  replayCount: t.Number({ minimum: 0, default: 0 }),
  seekEvents: t.Array(seekEventSchema, { default: [] }),
});

export type CreateWatchSessionBodyDTO = Static<
  typeof createWatchSessionBodySchema
>;

// ─── Repository Input Types ───────────────────────────────────────────────────

export interface CreateWatchSessionInput {
  userId: string;
  movieId: string;
  source: string;
  startSecond: number;
  endSecond: number;
  watchedSeconds: number;
  duration: number;
  percentWatched: number;
  completionType: CompletionType;
  pauseCount: number;
  replayCount: number;
  seekEvents: SeekEvent[];
}

export interface UpdateWatchSessionInput {
  endSecond: number;
  watchedSeconds: number;
  percentWatched: number;
  completionType: CompletionType;
  pauseCount: number;
  replayCount: number;
  seekEvents: SeekEvent[];
}

export interface FindTodaySessionInput {
  userId: string;
  movieId: string;
  source: string;
  todayStart: Date;
}
