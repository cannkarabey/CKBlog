import { prisma } from "../../config/database.js";
import { uniqueSlug } from "../../utils/slugify.js";
import { AppError } from "../../utils/response.js";
import type { CreateTagInput } from "./tags.schema.js";

export async function listTags() {
  return prisma.tag.findMany({ orderBy: { name: "asc" } });
}

export async function createTag(data: CreateTagInput) {
  const existing = await prisma.tag.findFirst({ where: { name: data.name } });
  if (existing) throw new AppError(409, "CONFLICT", "Tag already exists");

  const slug = await uniqueSlug(data.name, "tag");
  return prisma.tag.create({ data: { name: data.name, slug } });
}

export async function deleteTag(id: string) {
  const existing = await prisma.tag.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "NOT_FOUND", "Tag not found");
  await prisma.tag.delete({ where: { id } });
}
