import { Router } from 'express';
import * as skillController from '../controllers/skill.controller';
import { authenticate, requireRole } from '../middlewares/auth';
import { validateBody } from '../middlewares/validate';
import { skillSchema, skillUpdateSchema } from '../utils/schemas';

const router = Router();

router.get('/', skillController.getAll);

router.post('/', authenticate, requireRole('ADMIN', 'EDITOR'), validateBody(skillSchema), skillController.create);
router.put('/:id', authenticate, requireRole('ADMIN', 'EDITOR'), validateBody(skillUpdateSchema), skillController.update);
router.delete('/:id', authenticate, requireRole('ADMIN'), skillController.remove);

export default router;
