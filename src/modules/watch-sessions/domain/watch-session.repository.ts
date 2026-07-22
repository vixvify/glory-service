import {
  CreateWatchSessionInput,
  FindTodaySessionInput,
  UpdateWatchSessionInput,
  WatchSession,
} from "./watch-session";

export interface WatchSessionRepository {
  findToday(input: FindTodaySessionInput): Promise<WatchSession | null>;
  createAndIncrementViews(input: CreateWatchSessionInput): Promise<WatchSession>;
  update(id: string, input: UpdateWatchSessionInput): Promise<WatchSession>;
}
