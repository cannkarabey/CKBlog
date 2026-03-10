import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { env } from "./config/env.js";
import { corsOptions } from "./config/cors.js";
import { globalLimiter } from "./middleware/rateLimiter.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { prisma } from "./config/database.js";
import authRoutes from "./modules/auth/auth.routes.js";
import postRoutes from "./modules/posts/posts.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- Global Middleware ---
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(globalLimiter);

// --- Static files (uploads) ---
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// --- API Routes ---
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);

// --- Health Check ---
app.get("/api/v1/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      data: {
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: "connected",
      },
    });
  } catch {
    res.status(503).json({
      error: {
        code: "SERVICE_UNAVAILABLE",
        message: "Database connection failed",
      },
    });
  }
});

// --- 404 Handler ---
app.use((_req, res) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "The requested resource was not found",
    },
  });
});

// --- Error Handler ---
app.use(errorHandler);

export default app;
