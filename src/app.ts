import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { RegisterUser } from "./Controllers/Auth.Controller.js"
dotenv.config()

const app = express()


app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))

app.use(cors ({
    origin : process.env.CORS,
    credentials : true,
    allowedHeaders : ["Content-Type", "Authorization"]
}))



app.use("/api/v1", RegisterUser)
export default app