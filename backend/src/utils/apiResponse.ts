import type { Response } from 'express';

export function ok<T>(res: Response, data: T, message?: string, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data, message });
}

export function created<T>(res: Response, data: T, message = 'Creado correctamente') {
  return ok(res, data, message, 201);
}

export function fail(res: Response, message: string, statusCode = 400, errors?: Record<string, string>) {
  return res.status(statusCode).json({ success: false, message, errors });
}
