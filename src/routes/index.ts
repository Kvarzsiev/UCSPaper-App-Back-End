import { Router } from 'express';
import areaRouter from './area';
import personRouter from './person';
import projectRouter from './project';
import resultRouter from './result';

const router = Router();

router.use(areaRouter);
router.use(personRouter);
router.use(projectRouter);
router.use(resultRouter);

export default router;
