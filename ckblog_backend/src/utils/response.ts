import type { Response } from "express";

interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export function sendSuccess(res: Response, data: unknown, status = 200): void {
  res.status(status).json({ data });
}

export function sendPaginated(
  res: Response,
  data: unknown[],
  meta: PaginationMeta,
): void {
  res.status(200).json({ data, meta });
}

export function sendError(
  res: Response,
  status: number,
  code: string,
  message: string,
  details?: unknown[],
): void {
  res.status(status).json({
    error: { code, message, ...(details ? { details } : {}) },
  });
}

export class AppError extends Error {
  statusCode: number;
  code: string;
  details?: unknown[];

  constructor(statusCode: number, code: string, message: string, details?: unknown[]) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}
