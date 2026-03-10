import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { createTagSchema } from "./tags.schema.js";
import * as ctrl from "./tags.controller.js";

const router = Router();

router.get("/", ctrl.listTags);
router.post("/", requireAuth(["ADMIN"]), validate(createTagSchema), ctrl.createTag);
router.delete("/:id", requireAuth(["ADMIN"]), ctrl.deleteTag);

export default router;
