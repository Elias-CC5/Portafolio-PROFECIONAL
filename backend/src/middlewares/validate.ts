import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodType } from 'zod';

export function validateBody(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: Record<string, string> = {};
        for (const issue of err.issues) {
          const key = issue.path.join('.') || 'body';
          errors[key] = issue.message;
        }
        return res.status(422).json({ success: false, message: 'Datos inválidos', errors });
      }
      return next(err);
    }
  };
}
