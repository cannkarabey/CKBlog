import type { Request, Response, NextFunction } from "express";
import { sendSuccess, sendPaginated, AppError } from "../../utils/response.js";
import * as postService from "./posts.service.js";
import { postQuerySchema } from "./posts.schema.js";
import type { CreatePostInput, UpdatePostInput } from "./posts.schema.js";

export async function listPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user;
    const parsed = postQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      throw new AppError(400, "VALIDATION_ERROR", "Invalid query parameters");
    }
    const { posts, meta } = await postService.listPosts(parsed.data, isAdmin);
    sendPaginated(res, posts, meta);
  } catch (err) { next(err); }
}

export async function getPost(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user;
    const post = await postService.getPostBySlug(req.params.slug, isAdmin);
    sendSuccess(res, post);
  } catch (err) { next(err); }
}

export async function getPostById(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await postService.getPostById(req.params.id);
    sendSuccess(res, post);
  } catch (err) { next(err); }
}

export async function createPost(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await postService.createPost(req.body as CreatePostInput, req.user!.userId);
    sendSuccess(res, post, 201);
  } catch (err) { next(err); }
}

export async function updatePost(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await postService.updatePost(req.params.id, req.body as UpdatePostInput);
    sendSuccess(res, post);
  } catch (err) { next(err); }
}

export async function deletePost(req: Request, res: Response, next: NextFunction) {
  try {
    await postService.deletePost(req.params.id);
    sendSuccess(res, { message: "Post deleted" });
  } catch (err) { next(err); }
}

export async function publishPost(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await postService.publishPost(req.params.id);
    sendSuccess(res, post);
  } catch (err) { next(err); }
}

export async function unpublishPost(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await postService.unpublishPost(req.params.id);
    sendSuccess(res, post);
  } catch (err) { next(err); }
}
