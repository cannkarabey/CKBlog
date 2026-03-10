import { z } from "zod/v4";

export const createCategorySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
