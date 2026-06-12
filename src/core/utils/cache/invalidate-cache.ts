import { redis } from "../../../lib/redis";

export async function invalidateCache(patterns: string[]) {
  try {
    for (const pattern of patterns) {
      if (!pattern.includes("*")) {
        await redis.del(pattern);
        continue;
      }

      let cursor = "0";
      do {
        const result = await redis.scan(cursor, {
          MATCH: pattern,
          COUNT: 100,
        });
        cursor = result.cursor;

        if (result.keys.length) {
          await redis.del(result.keys);
        }
      } while (cursor !== "0");
    }
  } catch (error) {
    console.error("[Cache] Failed to invalidate cache:", error);
  }
}

