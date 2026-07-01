import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { ok } from '../utils/apiResponse';

export async function getSocialLinks(_req: Request, res: Response, next: NextFunction) {
  try {
    const links = await prisma.socialLink.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });
    return ok(res, links);
  } catch (err) {
    return next(err);
  }
}

export async function getEducation(_req: Request, res: Response, next: NextFunction) {
  try {
    const education = await prisma.education.findMany({ orderBy: { order: 'asc' } });
    return ok(res, education);
  } catch (err) {
    return next(err);
  }
}
