import { Router } from 'express';
import { get, create, edit, getById } from 'controllers/area';

const router = Router();

router.get('/areas', get);
router.get('/areas/:id', getById);
router.post('/areas', create);
router.put('/areas/:id', edit);

export default router;
