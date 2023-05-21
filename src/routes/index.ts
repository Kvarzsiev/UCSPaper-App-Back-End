import { Router } from 'express';
import personRouter from './person';
import projectRouter from './project';

const router = Router();

router.use(personRouter);
router.use(projectRouter);

export default router;
