import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { createProjectSchema, updateProjectSchema } from "./projects.schema.js";
import * as ctrl from "./projects.controller.js";

const router = Router();

// --- Public routes ---
router.get("/", ctrl.listProjects);
router.get("/slug/:slug", ctrl.getProject);

// --- Admin routes ---
router.get("/:id", requireAuth(["ADMIN"]), ctrl.getProjectById);
router.post("/", requireAuth(["ADMIN"]), validate(createProjectSchema), ctrl.createProject);
router.put("/:id", requireAuth(["ADMIN"]), validate(updateProjectSchema), ctrl.updateProject);
router.delete("/:id", requireAuth(["ADMIN"]), ctrl.deleteProject);

export default router;
