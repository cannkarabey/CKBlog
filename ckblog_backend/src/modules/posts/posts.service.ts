import { prisma } from "../../config/database.js";
import { uniqueSlug } from "../../utils/slugify.js";
import { paginationMeta } from "../../utils/pagination.js";
import { AppError } from "../../utils/response.js";
import type { CreatePostInput, UpdatePostInput, PostQuery } from "./posts.schema.js";

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

const postInclude = {
  author: { select: { id: true, name: true, email: true } },
  categories: { select: { id: true, name: true, slug: true } },
  tags: { select: { id: true, name: true, slug: true } },
};

// --- List (admin: all statuses, public: PUBLISHED only) ---
export async function listPosts(query: PostQuery, isAdmin: boolean) {
  const { page, pageSize, search, status, category, tag, sortBy, sortOrder } = query;

  const where: Record<string, unknown> = {};

  if (!isAdmin) {
    where.status = "PUBLISHED";
  } else if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
    ];
  }

  if (category) {
    where.categories = { some: { slug: category } };
  }

  if (tag) {
    where.tags = { some: { slug: tag } };
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: postInclude,
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, meta: paginationMeta(total, page, pageSize) };
}

// --- Get by slug ---
export async function getPostBySlug(slug: string, isAdmin: boolean) {
  const where: Record<string, unknown> = { slug };
  if (!isAdmin) where.status = "PUBLISHED";

  const post = await prisma.post.findFirst({ where, include: postInclude });
  if (!post) throw new AppError(404, "NOT_FOUND", "Post not found");
  return post;
}

// --- Get by ID (admin) ---
export async function getPostById(id: string) {
  const post = await prisma.post.findUnique({ where: { id }, include: postInclude });
  if (!post) throw new AppError(404, "NOT_FOUND", "Post not found");
  return post;
}

// --- Create ---
export async function createPost(data: CreatePostInput, authorId: string) {
  const slug = await uniqueSlug(data.title, "post");
  const readingTime = calcReadingTime(data.content);

  const post = await prisma.post.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.coverImageUrl,
      status: data.status ?? "DRAFT",
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      readingTime,
      authorId,
      categories: data.categoryIds?.length
        ? { connect: data.categoryIds.map((id) => ({ id })) }
        : undefined,
      tags: data.tagIds?.length
        ? { connect: data.tagIds.map((id) => ({ id })) }
        : undefined,
    },
    include: postInclude,
  });

  return post;
}

// --- Update ---
export async function updatePost(id: string, data: UpdatePostInput) {
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "NOT_FOUND", "Post not found");

  const slug = data.title ? await uniqueSlug(data.title, "post", id) : undefined;
  const readingTime = data.content ? calcReadingTime(data.content) : undefined;

  // Handle publish state change
  let publishedAt: Date | null | undefined;
  if (data.status === "PUBLISHED" && existing.status !== "PUBLISHED") {
    publishedAt = new Date();
  } else if (data.status && data.status !== "PUBLISHED") {
    publishedAt = null;
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(slug !== undefined && { slug }),
      ...(data.excerpt !== undefined && { excerpt: data.excerpt }),
      ...(data.content !== undefined && { content: data.content }),
      ...(data.coverImageUrl !== undefined && { coverImageUrl: data.coverImageUrl }),
      ...(data.status !== undefined && { status: data.status }),
      ...(publishedAt !== undefined && { publishedAt }),
      ...(readingTime !== undefined && { readingTime }),
      ...(data.categoryIds !== undefined && {
        categories: { set: data.categoryIds.map((id) => ({ id })) },
      }),
      ...(data.tagIds !== undefined && {
        tags: { set: data.tagIds.map((id) => ({ id })) },
      }),
    },
    include: postInclude,
  });

  return post;
}

// --- Delete ---
export async function deletePost(id: string) {
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "NOT_FOUND", "Post not found");
  await prisma.post.delete({ where: { id } });
}

// --- Publish / Unpublish ---
export async function publishPost(id: string) {
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "NOT_FOUND", "Post not found");

  const post = await prisma.post.update({
    where: { id },
    data: {
      status: "PUBLISHED",
      publishedAt: existing.publishedAt ?? new Date(),
    },
    include: postInclude,
  });

  return post;
}

export async function unpublishPost(id: string) {
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "NOT_FOUND", "Post not found");

  const post = await prisma.post.update({
    where: { id },
    data: { status: "DRAFT" },
    include: postInclude,
  });

  return post;
}
