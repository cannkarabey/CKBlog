import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod/v4";

type ValidationTarget = "body" | "query" | "params";

export function validate(schema: ZodType, target: ValidationTarget = "body") {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      const err = Object.assign(new Error("Validation failed"), {
        statusCode: 400,
        code: "VALIDATION_ERROR",
        details,
      });
      next(err);
      return;
    }
    req[target] = result.data;
    next();
  };
}
