import jwt, { JwtPayload } from "jsonwebtoken";

export const generarJWT = (payload: JwtPayload) => {

    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn: '7h'
    })

    return token

}