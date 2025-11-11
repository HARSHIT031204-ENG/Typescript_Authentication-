import { Router } from "express";
import { LoginUser, LogoutUser, RegisterUser, VerifyEmail } from "../Controllers/Auth.Controller.js";
import { RegisterValidation } from "../Middlewares/Register.validation.js";


const router = Router()
router.route("/register").post(RegisterValidation, RegisterUser)
router.route("/user/verify-email/:verificationtoken").post(VerifyEmail)
router.route("/login").post(LoginUser)
router.route("/logout").get(LogoutUser)

export default router