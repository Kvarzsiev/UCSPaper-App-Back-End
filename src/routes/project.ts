import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  editProject,
  editProjectPersons,
  deleteProjectPersons,
  editProjectResults,
  delProject,
  deleteProjectResults,
  editProjectAreas,
} from 'controllers/project';

const router = Router();

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', createProject);
router.put('/projects/:id', editProject);
router.put('/projects/persons/:id', editProjectPersons);
router.put('/projects/areas/:id', editProjectAreas);
router.delete('/projects/persons/:id', deleteProjectPersons);
router.put('/projects/results/:id', editProjectResults);
router.delete('/projects/:id', delProject);
router.delete('/projects/results/:id', deleteProjectResults);

export default router;
