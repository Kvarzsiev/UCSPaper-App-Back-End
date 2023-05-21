import { Router } from 'express';
import { getResults, getResultById, createResult } from 'controllers/result';

const router = Router();

router.get('/results', getResults);
router.get('/results/:id', getResultById);
router.post('/results', createResult);

export default router;
