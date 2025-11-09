import { UserM } from "../Models/user.model.js";
import { AsyncHandler } from "../Utils/Asynchandler.js";
import { ApiError } from "../Utils/Apierror.js";
import { ApiResponse } from "../Utils/Apiresponse.js";
import type { Request, Response } from "express";
import { SendMail, EmailverificationMailgen, ForgotPasswordMailgen } from "../Utils/Mail.js";


const GenerateOtp = function() {
    const otpnum = Math.floor(Math.random()*10)+100000
    return otpnum
}


export const RegisterUser = AsyncHandler(async (req: Request, res: Response) => {
    const {name, email, password} = req.validation

    if(!name || !email || !password){
        throw new ApiError(422, "All Fields required!", [])
    }

    const existuser = await UserM.findOne({email})

    if(existuser){
        throw new ApiError(409, "User's occurence already!", [])
    }

    const otp: number = GenerateOtp()

    await SendMail ({
        email: email,
        name: name,
        mailgenContent: EmailverificationMailgen(name, otp),
        subject: "",
        outro: ""
    })
    console.log(otp);
    
    const {reqotp} = req.body
    if(otp != reqotp){
        throw new ApiError(400, "invalid otp enterd !")
    }

   const user = await UserM.create({ name, email, password })

   const createdUser = await UserM.findById(user?._id).select(
    "-password -refreshtoken"
   )


   return res
    .status(200)
    .json(
        new ApiResponse(200, "User Registerd Success !", {data :createdUser} )
    );
})

// export const VerifyEmail = AsyncHandler(async(req: Request, res: Response) => {
//     const {email} = req.body
//     const user = await UserM.find({email})

//     if(user?.email != email) {
//         throw new ApiError(401, "Unauthorized user email not matched!")
//     }

//     const {unhashedTempToken, Hashedtemptoken, TemptokenExpiry} = user.generateTemporarytoken()



//     return res.statusCode(200)
//               .json(
//                 new ApiResponse(200, "email verified success!")
//             )


// })