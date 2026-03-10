import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { createCategorySchema } from "./categories.schema.js";
import * as ctrl from "./categories.controller.js";

const router = Router();

router.get("/", ctrl.listCategories);
router.post("/", requireAuth(["ADMIN"]), validate(createCategorySchema), ctrl.createCategory);
router.delete("/:id", requireAuth(["ADMIN"]), ctrl.deleteCategory);

export default router;
