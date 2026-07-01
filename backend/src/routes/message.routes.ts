import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as messageController from '../controllers/message.controller';
import { authenticate, requireRole } from '../middlewares/auth';
import { validateBody } from '../middlewares/validate';
import { contactSchema } from '../utils/schemas';

const router = Router();

// Limita envíos de formulario para prevenir spam/abuso
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { success: false, message: 'Demasiados mensajes enviados. Intenta de nuevo en unos minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Público
router.post('/', contactLimiter, validateBody(contactSchema), messageController.sendMessage);

// Admin
router.get('/', authenticate, requireRole('ADMIN', 'EDITOR'), messageController.getMessages);
router.patch('/:id', authenticate, requireRole('ADMIN', 'EDITOR'), messageController.markMessage);
router.delete('/:id', authenticate, requireRole('ADMIN'), messageController.removeMessage);

export default router;
