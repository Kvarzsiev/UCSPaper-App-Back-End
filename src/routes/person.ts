import { Router} from "express";
import { getPersons, getPersonById } from "controllers/person";

const router = Router();

router.get('/persons', getPersons);
router.get('/persons/:id', getPersonById);

export default router;