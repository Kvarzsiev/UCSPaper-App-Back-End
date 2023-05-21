import { Router } from 'express';
import { getProjects, getProjectById, createProject } from 'controllers/project';

const router = Router();

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', createProject);

export default router;
