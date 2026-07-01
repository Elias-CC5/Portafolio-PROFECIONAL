import { Router } from 'express';
import authRoutes from './auth.routes';
import messageRoutes from './message.routes';
import projectRoutes from './project.routes';
import skillRoutes from './skill.routes';
import experienceRoutes from './experience.routes';
import certificateRoutes from './certificate.routes';
import profileRoutes from './profile.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'API operativa', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);
router.use('/contact', messageRoutes);
router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/experience', experienceRoutes);
router.use('/certificates', certificateRoutes);
router.use('/profile', profileRoutes);

export default router;
