import { prisma } from "../../config/database.js";
import { uniqueSlug } from "../../utils/slugify.js";
import { paginationMeta } from "../../utils/pagination.js";
import { AppError } from "../../utils/response.js";
import type { CreateProjectInput, UpdateProjectInput, ProjectQuery } from "./projects.schema.js";

// --- List (public: ACTIVE only, admin: all) ---
export async function listProjects(query: ProjectQuery, isAdmin: boolean) {
  const { page, pageSize, search, status, tech, sortBy, sortOrder } = query;

  const where: Record<string, unknown> = {};

  if (!isAdmin) {
    where.status = "ACTIVE";
  } else if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { summary: { contains: search, mode: "insensitive" } },
    ];
  }

  if (tech) {
    where.techStack = { has: tech };
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.project.count({ where }),
  ]);

  return { projects, meta: paginationMeta(total, page, pageSize) };
}

// --- Get by slug ---
export async function getProjectBySlug(slug: string, isAdmin: boolean) {
  const where: Record<string, unknown> = { slug };
  if (!isAdmin) where.status = "ACTIVE";

  const project = await prisma.project.findFirst({ where });
  if (!project) throw new AppError(404, "NOT_FOUND", "Project not found");
  return project;
}

// --- Get by ID (admin) ---
export async function getProjectById(id: string) {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) throw new AppError(404, "NOT_FOUND", "Project not found");
  return project;
}

// --- Create ---
export async function createProject(data: CreateProjectInput) {
  const slug = await uniqueSlug(data.title, "project");

  const project = await prisma.project.create({
    data: {
      title: data.title,
      slug,
      summary: data.summary,
      content: data.content,
      repoUrl: data.repoUrl,
      liveUrl: data.liveUrl,
      techStack: data.techStack,
      coverImageUrl: data.coverImageUrl,
      status: data.status ?? "ACTIVE",
      order: data.order ?? 0,
    },
  });

  return project;
}

// --- Update ---
export async function updateProject(id: string, data: UpdateProjectInput) {
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "NOT_FOUND", "Project not found");

  const slug = data.title ? await uniqueSlug(data.title, "project", id) : undefined;

  const project = await prisma.project.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(slug !== undefined && { slug }),
      ...(data.summary !== undefined && { summary: data.summary }),
      ...(data.content !== undefined && { content: data.content }),
      ...(data.repoUrl !== undefined && { repoUrl: data.repoUrl }),
      ...(data.liveUrl !== undefined && { liveUrl: data.liveUrl }),
      ...(data.techStack !== undefined && { techStack: data.techStack }),
      ...(data.coverImageUrl !== undefined && { coverImageUrl: data.coverImageUrl }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.order !== undefined && { order: data.order }),
    },
  });

  return project;
}

// --- Delete ---
export async function deleteProject(id: string) {
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "NOT_FOUND", "Project not found");
  await prisma.project.delete({ where: { id } });
}
