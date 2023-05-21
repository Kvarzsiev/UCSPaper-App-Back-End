import { Router } from 'express';
import personRouter from './person';
import projectRouter from './project';
import resultRouter from './result';

const router = Router();

router.use(personRouter);
router.use(projectRouter);
router.use(resultRouter);

export default router;
