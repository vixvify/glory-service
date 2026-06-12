import { redis } from "../../../lib/redis";

export async function getCachedOrFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl = 3600,
): Promise<T> {
  let cached: string | null = null;
  try {
    cached = await redis.get(key);
  } catch (error) {
    console.warn(`[Cache] Failed to get key "${key}" from Redis:`, error);
  }

  if (cached) {
    try {
      return JSON.parse(cached) as T;
    } catch (parseError) {
      console.error(
        `[Cache] Failed to parse cached JSON for key "${key}":`,
        parseError,
      );
    }
  }

  const data = await fetchFn();

  try {
    await redis.set(key, JSON.stringify(data), { EX: ttl });
  } catch (error) {
    console.warn(`[Cache] Failed to set key "${key}" in Redis:`, error);
  }

  return data;
}
