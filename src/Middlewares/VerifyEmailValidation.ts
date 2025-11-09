// import type { NextFunction } from "express"
// import { ApiError } from "../Utils/Apierror.js"
// import jwt  from "jsonwebtoken"
// import { UserM } from "../Models/user.model.js"


// export const VerifyEmailValidation = (req : Request, res : Response, next : NextFunction) => {
//     const { refreshtoken } = req.cookies?.refreshtoken

//     if(!refreshtoken) {
//         throw new ApiError(401, "Unauthoruzed user acces to token !")
//     }

//     try {
//         const decodeRefreshtoken = jwt.verify(refreshtoken, process.env.REFRESHTOKEN_SECRET!)

//         if(!decodeRefreshtoken){
//             throw new ApiError(401, "not authorized!")
//         }

//         const user = UserM.findById(decodeRefreshtoken._id).select(
//             "-password -refreshtoken"
//         )

//         req.user = user
//         next() 
//     } catch (error) {
//         console.log("something went wrong in verify email validation", error);
        
//     }
// }