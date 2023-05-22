import { Router } from 'express';
import { getProjects, getProjectById, createProject, editProject } from 'controllers/project';

const router = Router();

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', createProject);
router.put('/projects/:id', editProject);

export default router;
