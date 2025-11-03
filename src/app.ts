import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config({
    path: ".../.env"
})
const app = express()

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))

app.use(cors ({
    origin : process.env.CORS,
    credentials : true,
    allowedHeaders : ["Content-Type", "Authorization"]
}))


export default app