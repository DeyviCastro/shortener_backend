import mongoose from "mongoose";

export const connectDB = async() => {

    try {
        const url = process.env.MONGO_URL
        if(!url){
            const error = new Error('No se encuentra la url de la base de datos')
            console.log(error)

            throw error
        }
        const db = await mongoose.connect(url)
        console.log("Se conecto a la base de datos")
        
    } catch (e) {
        const error = new Error('Error al conectar con la base de datos')
        console.log(error)
        process.exit(1)
    }

}