import dotenv from "dotenv";
dotenv.config()

import express from "express";
import cors from "cors";
import router from "./router";
import { connectDB } from "./config/db";
import { corsConfig } from "./config/cors";

const app = express()

//conectar a la base de datos
connectDB();

//configurar cors
app.use(cors(corsConfig))

app.use(express.json())
app.use('/', router)


export default app