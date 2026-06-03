export interface MovieBtsRepository {
  create(movieId: string, btsVideo: string[]): Promise<void>;
  upsert(movieId: string, btsVideo: string[]): Promise<void>;
}
