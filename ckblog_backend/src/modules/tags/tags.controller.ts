import type { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../utils/response.js";
import * as tagService from "./tags.service.js";
import type { CreateTagInput } from "./tags.schema.js";

export async function listTags(_req: Request, res: Response, next: NextFunction) {
  try {
    const tags = await tagService.listTags();
    sendSuccess(res, tags);
  } catch (err) { next(err); }
}

export async function createTag(req: Request, res: Response, next: NextFunction) {
  try {
    const tag = await tagService.createTag(req.body as CreateTagInput);
    sendSuccess(res, tag, 201);
  } catch (err) { next(err); }
}

export async function deleteTag(req: Request, res: Response, next: NextFunction) {
  try {
    await tagService.deleteTag(req.params.id);
    sendSuccess(res, { message: "Tag deleted" });
  } catch (err) { next(err); }
}
