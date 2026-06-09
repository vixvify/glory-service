import { redis } from "../../lib/redis";

export async function getCachedOrFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl = 3600,
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached) as T;
  }
  const data = await fetchFn();
  await redis.set(key, JSON.stringify(data), { EX: ttl });
  return data;
}
