import { prisma } from "../../config/database.js";
import { uniqueSlug } from "../../utils/slugify.js";
import { AppError } from "../../utils/response.js";
import type { CreateCategoryInput } from "./categories.schema.js";

export async function listCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export async function createCategory(data: CreateCategoryInput) {
  const existing = await prisma.category.findFirst({ where: { name: data.name } });
  if (existing) throw new AppError(409, "CONFLICT", "Category already exists");

  const slug = await uniqueSlug(data.name, "category");
  return prisma.category.create({
    data: { name: data.name, slug, description: data.description },
  });
}

export async function deleteCategory(id: string) {
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "NOT_FOUND", "Category not found");
  await prisma.category.delete({ where: { id } });
}
