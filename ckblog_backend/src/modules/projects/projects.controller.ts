import type { Request, Response, NextFunction } from "express";
import { sendSuccess, sendPaginated, AppError } from "../../utils/response.js";
import { projectQuerySchema } from "./projects.schema.js";
import * as projectService from "./projects.service.js";
import type { CreateProjectInput, UpdateProjectInput } from "./projects.schema.js";

export async function listProjects(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user;
    const parsed = projectQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      throw new AppError(400, "VALIDATION_ERROR", "Invalid query parameters");
    }
    const { projects, meta } = await projectService.listProjects(parsed.data, isAdmin);
    sendPaginated(res, projects, meta);
  } catch (err) { next(err); }
}

export async function getProject(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user;
    const project = await projectService.getProjectBySlug(req.params.slug, isAdmin);
    sendSuccess(res, project);
  } catch (err) { next(err); }
}

export async function getProjectById(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await projectService.getProjectById(req.params.id);
    sendSuccess(res, project);
  } catch (err) { next(err); }
}

export async function createProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await projectService.createProject(req.body as CreateProjectInput);
    sendSuccess(res, project, 201);
  } catch (err) { next(err); }
}

export async function updateProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await projectService.updateProject(req.params.id, req.body as UpdateProjectInput);
    sendSuccess(res, project);
  } catch (err) { next(err); }
}

export async function deleteProject(req: Request, res: Response, next: NextFunction) {
  try {
    await projectService.deleteProject(req.params.id);
    sendSuccess(res, { message: "Project deleted" });
  } catch (err) { next(err); }
}
