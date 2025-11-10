import { Router } from "express";
import { RegisterUser, VerifyEmail } from "../Controllers/Auth.Controller.js";
import { emailvalidation, RegisterValidation } from "../Middlewares/Register.validation.js";


const router = Router()
router.route("/register").post(RegisterValidation, RegisterUser)
router.route("user/verify-email/:verificationtoken").post(emailvalidation, VerifyEmail)


export default router