import { Router } from "express";
import { redirigir } from "./handlers";

const publicRouter = Router();

publicRouter.get('/:slug', redirigir)

export default publicRouter