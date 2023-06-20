import { Router } from 'express';
import { getResults, getResultById, createResult, editResult } from 'controllers/result';

const router = Router();

router.get('/results', getResults);
router.get('/results/:id', getResultById);
router.post('/results', createResult);
router.put('/results/:id', editResult);

export default router;
