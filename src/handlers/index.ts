import { json, Request, Response } from "express";
import User from "../models/User";
import { compararPassword, hashearPassword } from "../utils/hashPassword";
import { generarJWT } from "../utils/jwt";
import { nanoid } from "nanoid";
import Link from "../models/Links";


export const createUser = async (req: Request, res: Response) => {

    try {
        const { name, email, password } = req.body

        const userExist = await User.findOne({ email })

        if (userExist) {
            const error = new Error("Este correo ya esta en uso")
            return res.status(403).json({ error: error.message })
        }

        const contrasena = await hashearPassword(password)


        const user = new User({
            name,
            email,
            password: contrasena
        })

        await user.save()
        res.status(201).json("Usuario registrado correctamente")


    } catch (error) {
        console.log(error)
    }

}

export const login = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body

        const user = await (await User.findOne({ email }))
        if (!user) {
            const error = new Error("Este usuario no existe")
            return res.status(403).json({
                error: error.message
            })
        }

        const passwordCorrecto = await compararPassword(password, user.password)
        if (!passwordCorrecto) {
            const error = new Error("La contraseña es incorrecta")
            return res.status(400).json({
                error: error.message
            })
        }

        const token = generarJWT({
            id: user._id,
        })

        res.status(200).json({
            token
        })

    } catch (error) {
        console.log(error)
    }
}

export const home = async (req: Request, res: Response) => {

    try {

        if (!req.user) {
            const error = new Error('No autorizado')
            return res.status(401).json({ error: error.message })
        }


        const { originalUrl } = req.body


        const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/
        if (!urlRegex.test(originalUrl)) {
            return res.status(200).json({
                error: "La url no es valida"
            })
        }

        const slug = nanoid(6)

        const link = new Link({
            originalUrl,
            slug,
            user: req.user
        })

        await link.save()

        // res.status(200).send("link creado correctamente")

        res.status(200).json({
            msg:"Link creado correctamente",
            slug
        })

    } catch (error) {
        console.log(error)
    }
}

export const getLinks = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            const error = new Error('No autorizado')
            return res.status(401).json({ error: error.message })
        }

        const links = await Link.find({ user: req.user._id }).sort({ createdAt: -1 })

        res.status(200).json(links)

    } catch (error) {
        console.log(error)
    }
}

export const redirigir = async (req: Request, res: Response) => {

    const { slug } = req.params

    const link = await Link.findOne({ slug })

    if (!link) {
        const error = new Error('Link no encontrado')
        return res.status(404).json({ error: error.message })
    }

    link.clicks += 1
    await link.save()

    res.redirect(link.originalUrl)

}


export const deleteLink = async (req: Request, res: Response) => {

    try {
        if (!req.user) {
            const error = new Error('No autorizado')
            return res.status(401).json({ error: error.message })
        }

        const {id} = req.params

        const linkExist = await Link.findByIdAndDelete(id)

        if (!linkExist) {
            const error = new Error('Link no encontrado')
            return res.status(404).json({ error: error.message })
        }

        res.status(200).send("Link eliminado correctamente")


    } catch (error) {
        console.log(error)
    }


}