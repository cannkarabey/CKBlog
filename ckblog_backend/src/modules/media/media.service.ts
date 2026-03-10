import { prisma } from "../../config/database.js";
import { AppError } from "../../utils/response.js";
import { paginationMeta } from "../../utils/pagination.js";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "..", "..", "..", "uploads");

export async function listMedia(page: number, pageSize: number) {
  const [media, total] = await Promise.all([
    prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { uploader: { select: { id: true, name: true } } },
    }),
    prisma.media.count(),
  ]);
  return { media, meta: paginationMeta(total, page, pageSize) };
}

export async function createMedia(
  file: Express.Multer.File,
  uploaderId: string,
) {
  const url = `/uploads/${file.filename}`;
  return prisma.media.create({
    data: {
      url,
      key: file.filename,
      mime: file.mimetype,
      size: file.size,
      uploaderId,
    },
  });
}

export async function deleteMedia(id: string) {
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) throw new AppError(404, "NOT_FOUND", "Media not found");

  // Delete file from disk
  const filePath = path.join(uploadsDir, media.key);
  try {
    await fs.unlink(filePath);
  } catch {
    // File may already be deleted — continue with DB cleanup
  }

  await prisma.media.delete({ where: { id } });
}
