import { Router } from "express";
import { loginHandler, refreshHandler, logoutHandler, meHandler } from "./auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { requireAuth } from "../../middleware/auth.js";
import { authLimiter } from "../../middleware/rateLimiter.js";
import { loginSchema } from "./auth.schema.js";

const router = Router();

router.post("/login", authLimiter, validate(loginSchema), loginHandler);
router.post("/refresh", refreshHandler);
router.post("/logout", requireAuth(), logoutHandler);
router.get("/me", requireAuth(), meHandler);

export default router;
