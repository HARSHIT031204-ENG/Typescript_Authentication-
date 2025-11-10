import { UserM } from "../Models/user.model.js";
import { AsyncHandler } from "../Utils/Asynchandler.js";
import { ApiError } from "../Utils/Apierror.js";
import { ApiResponse } from "../Utils/Apiresponse.js";
import type { Request, Response } from "express";
import {
    SendMail,
    EmailverificationMailgen,
    ForgotPasswordMailgen,
} from "../Utils/Mail.js";
import crypto from "crypto";


// const GenerateOtp = function() {
//     const otpnum = Math.floor(Math.random()*10)+100000
//     return otpnum
// }

const Generate_Access_Refresh_Token = async(userId : number) => {
    const user = await UserM.findOne(userId).exec()

    try {
        const RefreshToken = await 
    } catch (error) {
        console.log("error is generating", error);
    }
}

export const RegisterUser = AsyncHandler(
    async (req: Request, res: Response) => {
        const { name, email, password } = req.validation;

        if (!name || !email || !password) {
            throw new ApiError(422, "All Fields required!", []);
        }

        const existuser = await UserM.findOne({ email });

        if (existuser) {
            throw new ApiError(409, "User's occurence already!", []);
        }

        // const otp: number = GenerateOtp()

        // await SendMail ({
        //     email: email,
        //     name: name,
        //     mailgenContent: EmailverificationMailgen(name, otp),
        //     subject: "",
        //     outro: ""
        // })
        // console.log(otp);

        // const {reqotp} = req.body
        // if(otp != reqotp){
        //     throw new ApiError(400, "invalid otp enterd !")
        // }

        const user = await UserM.create({ name, email, password });

        const createdUser = await UserM.findById(user?._id).select(
            "-password -refreshtoken"
        );

        const { unhashedTempToken, Hashedtemptoken, TemptokenExpiry } =
           await user.generateTemporarytoken();

        // console.log(unhashedTempToken);
        // console.log(Hashedtemptoken);
        // console.log(TemptokenExpiry);

        await SendMail({
            email: email,
            name: user?.name,
            mailgenContent: EmailverificationMailgen(
                user?.name,
                `${req.protocol}://${req.get(
                    "host"
                )}/api/v1/user/verify-email/${unhashedTempToken}`
            ),
            subject: "Verifu your email ",
            outro: "click on given button ",
        });

        // const tokenexpirydate = new Date(TemptokenExpiry ?? "");
        user.emailverificationToken = Hashedtemptoken as string;
        user.emailverificationexpiry = TemptokenExpiry;

        await user.save({ validateBeforeSave: false });
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "User Registerd Success! and verification email send",
                    { data: createdUser }
                )
            );
    }
);

export const VerifyEmail = AsyncHandler(async (req: Request, res: Response) => {

    const { verificationtoken } = req.params;
    console.log(verificationtoken);
    
    const verificationhasedtoken = crypto
        .createHash("sha256")
        .update(verificationtoken!)
        .digest("hex");

    const verifysucces = await UserM.findOne({
        emailverificationToken: verificationhasedtoken,
        emailverificationexpiry: { $gt: Date.now() },
    }).select("-password, -refreshtoken");

    if (!verifysucces) {
        throw new ApiError(400, "user not  found ! ");
    }
    
    if(verifysucces.isEmailverified ){
        return res.json(new ApiResponse(200, "email verified alreday "))
    }
    verifysucces.isEmailverified = true;
    await verifysucces.save({ validateBeforeSave: false });

    res.status(200).json(
        new ApiResponse(200, "email verifed successfully!", { data: verifysucces })
    );
});

export const LoginUser = AsyncHandler(async(req: Request, res: Response) => {
    const {email, password} = req.body

    if(!email || !password){
        throw new ApiError(400, "incoming credentials required!")
    }

    const existuser = await UserM.findOne({email}).exec()

    if(!existuser){
        throw new ApiError(400, "bad request!")
    }

    const {} = await Generate_Access_Refresh_Token(existuser._id)
})