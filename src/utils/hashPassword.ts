import bcrypt from "bcrypt";

export const hashearPassword = async(password: string) => {

    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)

}

export const compararPassword = async(password: string, passwordHash: string) => {
    return await bcrypt.compare(password, passwordHash)
}