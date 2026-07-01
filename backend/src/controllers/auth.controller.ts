import type { Request, Response, NextFunction } from 'express';
import { loginUser } from '../services/auth.service';
import { ok } from '../utils/apiResponse';
import { env } from '../config/env';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: env.isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return ok(res, { token, user }, 'Sesión iniciada correctamente');
  } catch (err) {
    return next(err);
  }
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie('token');
  return ok(res, null, 'Sesión cerrada correctamente');
}

export async function me(req: Request, res: Response) {
  return ok(res, req.user);
}
