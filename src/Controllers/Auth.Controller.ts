import { UserM } from "../Models/user.model.js";
import { AsyncHandler } from "../Middlewares/Asynchandler.js";
import { ApiError } from "../Middlewares/Apierror.js";
import { ApiResponse } from "../Middlewares/Apiresponse.js";
import type { Request, Response } from "express";

export const RegisterUser = AsyncHandler(async (req: Request, res: Response) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        throw new ApiError(422, "All Fields required!", [])
    }

    const existuser = await UserM.findOne({email})

    if(existuser){
        throw new ApiError(409, "User's occurence already!", [])
    }


   const user = await UserM.create({ name, email, password })

   const createdUser = await UserM.findById(user?._id).select(
    "-password -refreshtoken"
   )

   const RefreshToken = user.generateRefreshtoken()

   user.refreshtoken = RefreshToken

   await user.save({validateBeforeSave : true})

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