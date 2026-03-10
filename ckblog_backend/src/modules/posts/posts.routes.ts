import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { createPostSchema, updatePostSchema } from "./posts.schema.js";
import * as ctrl from "./posts.controller.js";

const router = Router();

// --- Public routes ---
router.get("/", ctrl.listPosts);
router.get("/slug/:slug", ctrl.getPost);

// --- Admin routes ---
router.get("/:id", requireAuth(["ADMIN", "AUTHOR"]), ctrl.getPostById);
router.post("/", requireAuth(["ADMIN", "AUTHOR"]), validate(createPostSchema), ctrl.createPost);
router.put("/:id", requireAuth(["ADMIN", "AUTHOR"]), validate(updatePostSchema), ctrl.updatePost);
router.delete("/:id", requireAuth(["ADMIN"]), ctrl.deletePost);
router.post("/:id/publish", requireAuth(["ADMIN", "AUTHOR"]), ctrl.publishPost);
router.post("/:id/unpublish", requireAuth(["ADMIN", "AUTHOR"]), ctrl.unpublishPost);

export default router;
