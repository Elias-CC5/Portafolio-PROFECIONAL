import { Router } from 'express';
import * as experienceController from '../controllers/experience.controller';
import { authenticate, requireRole } from '../middlewares/auth';
import { validateBody } from '../middlewares/validate';
import { experienceSchema, experienceUpdateSchema } from '../utils/schemas';

const router = Router();

router.get('/', experienceController.getAll);

router.post('/', authenticate, requireRole('ADMIN', 'EDITOR'), validateBody(experienceSchema), experienceController.create);
router.put('/:id', authenticate, requireRole('ADMIN', 'EDITOR'), validateBody(experienceUpdateSchema), experienceController.update);
router.delete('/:id', authenticate, requireRole('ADMIN'), experienceController.remove);

export default router;
