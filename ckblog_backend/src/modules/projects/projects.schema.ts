import { z } from "zod/v4";

export const createProjectSchema = z.object({
  title: z.string().min(2).max(200),
  summary: z.string().min(10).max(500),
  content: z.string().optional(),
  repoUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  techStack: z.array(z.string().min(1)).default([]),
  coverImageUrl: z.string().url().optional(),
  status: z.enum(["ACTIVE", "ARCHIVED"]).optional(),
  order: z.number().int().min(0).optional(),
});

export const updateProjectSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  summary: z.string().min(10).max(500).optional(),
  content: z.string().nullable().optional(),
  repoUrl: z.string().url().nullable().optional(),
  liveUrl: z.string().url().nullable().optional(),
  techStack: z.array(z.string().min(1)).optional(),
  coverImageUrl: z.string().url().nullable().optional(),
  status: z.enum(["ACTIVE", "ARCHIVED"]).optional(),
  order: z.number().int().min(0).optional(),
});

export const projectQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.enum(["ACTIVE", "ARCHIVED"]).optional(),
  tech: z.string().optional(),
  sortBy: z.enum(["order", "createdAt", "title"]).default("order"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectQuery = z.infer<typeof projectQuerySchema>;
