import type { Request, Response, NextFunction } from 'express';
import * as projectService from '../services/project.service';
import { ok, created } from '../utils/apiResponse';
import { NotFoundError } from '../utils/AppError';

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const projects = await projectService.listProjects();
    return ok(res, projects);
  } catch (err) {
    return next(err);
  }
}

export async function getOne(req: Request<{ slug: string }>, res: Response, next: NextFunction) {
  try {
    const project = await projectService.getProjectBySlug(req.params.slug);
    if (!project) throw new NotFoundError('Proyecto');
    return ok(res, project);
  } catch (err) {
    return next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await projectService.createProject(req.body);
    return created(res, project);
  } catch (err) {
    return next(err);
  }
}

export async function update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    return ok(res, project, 'Proyecto actualizado');
  } catch (err) {
    return next(err);
  }
}

export async function remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    await projectService.deleteProject(req.params.id);
    return ok(res, null, 'Proyecto eliminado');
  } catch (err) {
    return next(err);
  }
}
