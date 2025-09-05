import dotenv from "dotenv";
dotenv.config()

import express from "express";
import cors from "cors";
import router from "./router";
import { connectDB } from "./config/db";
import { corsConfig } from "./config/cors";
import publicRouter from "./publicRouter";

const app = express()

//conectar a la base de datos
connectDB();

//configurar cors esto es en toda la aplicacion
// app.use(cors(corsConfig))

app.use(express.json())
app.use('/api', cors(corsConfig), router) //solo para la api
app.use('/', publicRouter)

export default app