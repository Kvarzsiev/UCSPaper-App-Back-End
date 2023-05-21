import { Router } from 'express';
import { getPersons, getPersonById, createPerson } from 'controllers/person';

const router = Router();

router.get('/persons', getPersons);
router.get('/persons/:id', getPersonById);
router.post('/persons', createPerson);

export default router;
