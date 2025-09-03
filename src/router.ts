import { Router } from "express";
import { createUser, deleteLink, getLinks, home, login, redirigir } from "./handlers";
import { body } from "express-validator";
import { ValidateInputs } from "./middlewares/inputsValidation";
import { autenticarse } from "./middlewares/auth";


const router = Router();

router.post('/auth/register', 
    body('name').notEmpty().withMessage('El nombre esta vacio'),
    body('email').isEmail().withMessage('El email no es valido'),
    body('password').notEmpty().withMessage('La contraseña esta vacia'),
    ValidateInputs,
    createUser )



router.post('/auth/login', 
    body('email').isEmail().withMessage('El email no es valido'),
    body('password').notEmpty().withMessage('La contraseña esta vacia'),
    ValidateInputs,
    login )


router.post('/home', autenticarse,home)
router.get('/getLinks', autenticarse, getLinks)

router.get('/:slug', redirigir)
router.delete('/links/:id', autenticarse, deleteLink)


export default router;