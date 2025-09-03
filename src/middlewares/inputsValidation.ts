import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";

export const ValidateInputs = (req:Request, res:Response, next:NextFunction) => {
    const resultado = validationResult(req)
    if (!resultado.isEmpty()) {
        return res.status(400).json({ 
            errors: resultado.array() 
        })
    }
    next()
}