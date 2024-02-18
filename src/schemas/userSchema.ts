import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../models/IUser";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) next()

    try {
        const salt = await bcrypt.genSalt(11)
        this.password = await bcrypt.hash(this.password, salt)
        next()   
    } catch (error:any) {
        console.log(error)
    }
});

// note: getting error
// userSchema.methods.isPasswordCorrect = async function(password:string) {
//     try {
//         return await bcrypt.compare(password, this.password)
//     } catch (error:any) {
//      console.log(error);   
//     }
// }

export const User = mongoose.model<IUser>("User", userSchema);