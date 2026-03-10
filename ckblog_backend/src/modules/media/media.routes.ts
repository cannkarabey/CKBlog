import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { upload } from "../../middleware/upload.js";
import * as ctrl from "./media.controller.js";

const router = Router();

router.get("/", requireAuth(["ADMIN"]), ctrl.listMedia);
router.post("/", requireAuth(["ADMIN"]), upload.single("file"), ctrl.uploadMedia);
router.delete("/:id", requireAuth(["ADMIN"]), ctrl.deleteMedia);

export default router;
