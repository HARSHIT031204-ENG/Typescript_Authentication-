import { Router } from "express";
import { RegisterUser } from "../Controllers/Auth.Controller.js";
import { RegisterValidation } from "../Middlewares/Register.validation.js";


const router = Router()
router.route("/register").post(RegisterValidation, RegisterUser)



export default router