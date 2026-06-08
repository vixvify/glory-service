import { redis } from "../../lib/redis";

export async function invalidateCache(patterns: string[]) {
  for (const pattern of patterns) {
    if (!pattern.includes("*")) {
      await redis.del(pattern);
      continue;
    }

    const keys = await redis.keys(pattern);

    if (keys.length) {
      await Promise.all(keys.map((key) => redis.del(key)));
    }
  }
}
