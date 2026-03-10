import { z } from "zod/v4";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.url(),
  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),
  JWT_ACCESS_EXPIRY: z.string().default("15m"),
  JWT_REFRESH_EXPIRY: z.string().default("7d"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  STORAGE_PROVIDER: z.enum(["local", "s3"]).default("local"),
  ADMIN_EMAIL: z.email().default("admin@ckblog.com"),
  ADMIN_PASSWORD: z.string().min(6).default("Admin123!"),
  ADMIN_NAME: z.string().default("Admin"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
