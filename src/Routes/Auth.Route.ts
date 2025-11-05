import { Router } from "express";
import { RegisterUser } from "../Controllers/Auth.Controller.js";


const router = Router()
router.route("/register").post(RegisterUser)