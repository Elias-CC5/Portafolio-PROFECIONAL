import { Router } from 'express';
import * as profileController from '../controllers/profile.controller';

const router = Router();

router.get('/social-links', profileController.getSocialLinks);
router.get('/education', profileController.getEducation);

export default router;
