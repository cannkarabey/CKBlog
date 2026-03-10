import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { sendError } from "../utils/response.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

export function requireAuth(roles?: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      sendError(res, 401, "UNAUTHORIZED", "Access token is required");
      return;
    }

    const token = authHeader.slice(7);
    try {
      const payload = verifyAccessToken(token);
      if (roles && !roles.includes(payload.role)) {
        sendError(res, 403, "FORBIDDEN", "Insufficient permissions");
        return;
      }
      req.user = payload;
      next();
    } catch {
      sendError(res, 401, "UNAUTHORIZED", "Invalid or expired access token");
    }
  };
}
