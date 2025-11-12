import { Router } from "express";
import { CurrentPasswordChange, EmailUpdate, FinallychangeEmail, ForgotPassword, GetcurrentUser, LoginUser, LogoutUser, RegisterUser, ResetPassword, VerifyEmail } from "../Controllers/Auth.Controller.js";
import { RegisterValidation } from "../Middlewares/Register.validation.js";
import { Authvalidation } from "../Middlewares/Auth.validation.js";


const router = Router()
router.route("/register").post(RegisterValidation, RegisterUser)
router.route("/user/verify-email/:verificationtoken").post(VerifyEmail)
router.route("/login").post(LoginUser)
router.route("/logout").get(Authvalidation, LogoutUser)
router.route("/GetCurrentUser").get(Authvalidation, GetcurrentUser)
router.route("/CurrentpasswordChange").post(Authvalidation, CurrentPasswordChange)
router.route("/ForgotPassword").get(ForgotPassword)
router.route("/ResetPaswword/:resetlinktoken").post(ResetPassword)
router.route("/EmailUpdate").post(Authvalidation, EmailUpdate)
router.route("/FinallyEmailUpdate").post(Authvalidation, FinallychangeEmail)

export default router