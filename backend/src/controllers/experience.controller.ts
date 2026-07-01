import type { Request, Response, NextFunction } from 'express';
import * as experienceService from '../services/experience.service';
import { ok, created } from '../utils/apiResponse';

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const experience = await experienceService.listExperience();
    return ok(res, experience);
  } catch (err) {
    return next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const experience = await experienceService.createExperience(req.body);
    return created(res, experience);
  } catch (err) {
    return next(err);
  }
}

export async function update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const experience = await experienceService.updateExperience(req.params.id, req.body);
    return ok(res, experience, 'Experiencia actualizada');
  } catch (err) {
    return next(err);
  }
}

export async function remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    await experienceService.deleteExperience(req.params.id);
    return ok(res, null, 'Experiencia eliminada');
  } catch (err) {
    return next(err);
  }
}
