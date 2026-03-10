import type { Request, Response, NextFunction } from "express";
import { sendSuccess, sendPaginated, AppError } from "../../utils/response.js";
import * as mediaService from "./media.service.js";

export async function listMedia(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize as string) || 20));
    const { media, meta } = await mediaService.listMedia(page, pageSize);
    sendPaginated(res, media, meta);
  } catch (err) { next(err); }
}

export async function uploadMedia(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) throw new AppError(400, "VALIDATION_ERROR", "No file uploaded");
    const media = await mediaService.createMedia(req.file, req.user!.userId);
    sendSuccess(res, media, 201);
  } catch (err) { next(err); }
}

export async function deleteMedia(req: Request, res: Response, next: NextFunction) {
  try {
    await mediaService.deleteMedia(req.params.id);
    sendSuccess(res, { message: "Media deleted" });
  } catch (err) { next(err); }
}
