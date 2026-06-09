const env = process.env.NODE_ENV || "development";
const jwtSecret = process.env.JWT_SECRET;

if (env === "production" && !jwtSecret) {
  throw new Error("JWT_SECRET is required in production.");
}

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  databaseUrl: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/glory_db?schema=public",
  jwtSecret: jwtSecret || "development-only-glory-secret",
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  env,
  r2: {
    accountId: process.env.R2_ACCOUNT_ID || "",
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    bucketName: process.env.R2_BUCKET_NAME || "",
    publicUrl: process.env.R2_PUBLIC_URL || "",
  },
};
