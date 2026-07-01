import { Router } from 'express';
import * as projectController from '../controllers/project.controller';
import { authenticate, requireRole } from '../middlewares/auth';
import { validateBody } from '../middlewares/validate';
import { projectSchema, projectUpdateSchema } from '../utils/schemas';

const router = Router();

// Público
router.get('/', projectController.getAll);
router.get('/:slug', projectController.getOne);

// Admin
router.post('/', authenticate, requireRole('ADMIN', 'EDITOR'), validateBody(projectSchema), projectController.create);
router.put('/:id', authenticate, requireRole('ADMIN', 'EDITOR'), validateBody(projectUpdateSchema), projectController.update);
router.delete('/:id', authenticate, requireRole('ADMIN'), projectController.remove);

export default router;
