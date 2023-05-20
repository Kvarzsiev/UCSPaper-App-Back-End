import { Router } from "express";
import personRouter from "./person";

const router = Router();

router.use(personRouter)

export default router;