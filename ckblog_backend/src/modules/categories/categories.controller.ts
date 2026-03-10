import type { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../utils/response.js";
import * as categoryService from "./categories.service.js";
import type { CreateCategoryInput } from "./categories.schema.js";

export async function listCategories(_req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await categoryService.listCategories();
    sendSuccess(res, categories);
  } catch (err) { next(err); }
}

export async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await categoryService.createCategory(req.body as CreateCategoryInput);
    sendSuccess(res, category, 201);
  } catch (err) { next(err); }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  try {
    await categoryService.deleteCategory(req.params.id);
    sendSuccess(res, { message: "Category deleted" });
  } catch (err) { next(err); }
}
