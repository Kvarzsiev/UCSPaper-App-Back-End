import { Router } from 'express';
import { getPersons, getPersonById, createPerson, editPerson } from 'controllers/person';

const router = Router();

router.get('/persons', getPersons);
router.get('/persons/:id', getPersonById);
router.post('/persons', createPerson);
router.put('/persons/:id', editPerson);

export default router;
