import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import Allroutes from "./Routes/Auth.Route.js"
dotenv.config()

const app = express()

app.use(cookieParser())
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))

app.use(cors ({
    origin : process.env.CORS,
    credentials : true,
    allowedHeaders : ["Content-Type", "Authorization"]
}))



app.use("/api/v1", Allroutes)
export default app