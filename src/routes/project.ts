import { Router } from 'express';
import { getProjects, getProjectById, createProject, editProject } from 'controllers/project';
import { CustomError } from 'utils/customError';

const router = Router();

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', createProject);
router.put('/projects/:id', editProject);
router.put('/projects/:id/removePerson', (req, res, next) => {
  return next(new CustomError(501, 'Raw', 'Remove Person from project not supported'));
});
router.put('/projects/:id/removeResult', (req, res, next) => {
  return next(new CustomError(501, 'Raw', 'Remove Result from project not supported'));
});

export default router;
