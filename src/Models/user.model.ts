import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt, { type SignOptions } from "jsonwebtoken"
import crypto from "crypto"
import type { Types, UpdateQuery } from "mongoose";

export interface Iuser extends mongoose.Document {
  _id : Types.ObjectId,
  name : string,
  email : string,
  password : string,
  avatar? : string,
  forgotPasswordToken? : string | undefined,
  forgotPasswordexpiry? : Date | undefined,
  emailverificationToken? : string | undefined,
  emailverificationexpiry? : Date | undefined,
  isEmailverified? : boolean,
  refreshtoken? : string,
  emailotp? : string | number,
  ispasswordCorrect(password : string) : boolean,
  generateRefreshtoken() : string,
  generateAccestoken() : string,
  generateTemporarytoken() : {
    unhashedTempToken? : string | undefined,
    Hashedtemptoken? : string | undefined,
    TemptokenExpiry? : Date | undefined
  }
}

const Schema = mongoose.Schema

const Usermodel = new Schema<Iuser>({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    avatar: {
      type: {
        url: String,
        localpath: String,
      },
      default: {
        url: `http://placehold.co/200x200`,
        localpath: "",
      },
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordexpiry: {
      type: Date,
    },
    emailverificationToken: {
      type: String,
    },
    emailverificationexpiry: {
      type: Date,
    },
    isEmailverified: {
      type: Boolean,
      default: false,
    },
    refreshtoken: {
      type: String,
    },
    emailotp : {
      type : Number || String,
    },
},
  {
    timestamps: true,
  },
)

Usermodel.pre("save", async function (next) {
   if(!this.isModified("password") ) return next()
   const hashedpassword = await bcrypt.hash(this.password, 10)
   this.password = hashedpassword
});

Usermodel.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as UpdateQuery<any>;
    if(update && update.password) {
        this.setUpdate({ ...update, password: await bcrypt.hash(update.password, 10) } )
    }
    next();
})

Usermodel.methods.ispasswordCorrect = async function(password : string) {
    return await bcrypt.compare(password, this.password)
}

Usermodel.methods.generateRefreshtoken = async function () {

  return jwt.sign({
      _id : this._id
  },
  process.env.REFRESHTOKEN_SECRET!,
  {expiresIn : process.env.REFRESHTOKEN_EXPIRY!} as SignOptions
  );
}

Usermodel.methods.generateAccestoken = async function () {
  return jwt.sign({
      _id : this._id,
      email : this.email,
      name : this.name,
      
  },
  process.env.ACCESSTOKEN_SECRET!,
  {expiresIn : process.env.ACCESSTOKEN_EXPIRY!} as SignOptions
  );
}

Usermodel.methods.generateTemporarytoken = async function() {
  let unhashedTempToken = crypto.randomBytes(10).toString("hex")
  let Hashedtemptoken = crypto.createHash("sha256").update(unhashedTempToken).digest("hex")
  let TemptokenExpiry = Date.now() + (20*60*1000)
  
  return {unhashedTempToken, Hashedtemptoken, TemptokenExpiry}
}

export const UserM = mongoose.model<Iuser>("User", Usermodel)