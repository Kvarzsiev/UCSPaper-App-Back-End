import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  editProject,
  editProjectPersons,
  deleteProjectPersons,
  editProjectResults,
} from 'controllers/project';
import { CustomError } from 'utils/customError';

const router = Router();

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', createProject);
router.put('/projects/:id', editProject);
router.put('/projects/persons/:id', editProjectPersons);
router.delete('/projects/persons/:id', deleteProjectPersons);
router.put('/projects/results/:id', editProjectResults);
router.delete('/projects/results/:id', (req, res, next) => {});

export default router;
