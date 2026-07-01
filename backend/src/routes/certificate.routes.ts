import { Router } from 'express';
import * as certificateController from '../controllers/certificate.controller';
import { authenticate, requireRole } from '../middlewares/auth';
import { validateBody } from '../middlewares/validate';
import { certificateSchema, certificateUpdateSchema } from '../utils/schemas';

const router = Router();

router.get('/', certificateController.getAll);

router.post('/', authenticate, requireRole('ADMIN', 'EDITOR'), validateBody(certificateSchema), certificateController.create);
router.put('/:id', authenticate, requireRole('ADMIN', 'EDITOR'), validateBody(certificateUpdateSchema), certificateController.update);
router.delete('/:id', authenticate, requireRole('ADMIN'), certificateController.remove);

export default router;
