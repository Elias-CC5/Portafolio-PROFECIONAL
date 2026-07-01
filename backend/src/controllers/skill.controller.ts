import type { Request, Response, NextFunction } from 'express';
import * as skillService from '../services/skill.service';
import { ok, created } from '../utils/apiResponse';

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const skills = await skillService.listSkills();
    return ok(res, skills);
  } catch (err) {
    return next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const skill = await skillService.createSkill(req.body);
    return created(res, skill);
  } catch (err) {
    return next(err);
  }
}

export async function update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const skill = await skillService.updateSkill(req.params.id, req.body);
    return ok(res, skill, 'Habilidad actualizada');
  } catch (err) {
    return next(err);
  }
}

export async function remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    await skillService.deleteSkill(req.params.id);
    return ok(res, null, 'Habilidad eliminada');
  } catch (err) {
    return next(err);
  }
}
