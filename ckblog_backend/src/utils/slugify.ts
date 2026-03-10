import { prisma } from "../config/database.js";

const turkishMap: Record<string, string> = {
  ü: "u", Ü: "u",
  ş: "s", Ş: "s",
  ğ: "g", Ğ: "g",
  ç: "c", Ç: "c",
  ö: "o", Ö: "o",
  ı: "i", İ: "i",
};

export function slugify(text: string): string {
  let slug = text.toLowerCase();
  for (const [from, to] of Object.entries(turkishMap)) {
    slug = slug.replaceAll(from, to);
  }
  return slug
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function uniqueSlug(
  title: string,
  table: "post" | "project" | "category" | "tag",
  excludeId?: string,
): Promise<string> {
  const base = slugify(title);
  let candidate = base;
  let counter = 0;

  while (true) {
    const where: Record<string, unknown> = { slug: candidate };
    if (excludeId) where.id = { not: excludeId };

    const existing = await (prisma[table] as any).findFirst({ where });
    if (!existing) return candidate;

    counter++;
    candidate = `${base}-${counter}`;
  }
}
