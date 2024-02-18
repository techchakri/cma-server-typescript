import {Request, Response} from "express";
import { IUser } from "../models/IUser";
import { User } from "../schemas/userSchema";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export interface userPayload {
    id: string | undefined;
    email: string;
}

/**
 * @usage : Register a User
 * @method : POST
 * @url : http://localhost:9000/users/register
 * @param : username, email, password
 * @access : PUBLIC
 */

export const registerUser = async (req:Request, res:Response) => {
    try {
        // read the form data
        const {username, email, password} = req.body;

        // check if the user is already exists
        const userExists: IUser | undefined | null = await User.findOne({ email });

        if (userExists) {
            throw new Error("User is already exists");
        }


        // encrypt the password
        // const salt = await bcrypt.genSalt(11);
        // const hashedPassword = await bcrypt.hash(password, salt)

        // get image url from Gravatar DB
        const imageUrl = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});

        // insert the data
        const user:IUser = await User.create({
            username,
            email,
            password,
            imageUrl,
        });

        if (!user) {
            throw new Error("user creation failed");
        }

        return res
        .status(200)
        .json({
            msg: "Registration is Success",
            data: user
        });

    } catch (error:any) {
        return res
        .status(500)
        .json({
            msg: error.message
        })
    }
}


/**
 * @usage : Login a User
 * @method : POST
 * @url : http://localhost:9000/users/login
 * @param : email, password
 * @access : PUBLIC
 */

export const loginUser = async (req:Request, res:Response) => {
    try {

        // read the from data
        const {email, password} = req.body;

        // check if the email is exists
        const userExists:IUser | undefined | null = await User.findOne({ email });

        if (!userExists) {
            throw new Error("Invalid Credentials Email");
        }

        // check / decode the password

        const isPasswordCorrect:boolean = await bcrypt.compare(password, userExists.password);
        
        if (!isPasswordCorrect) {
            throw new Error("Invalid Credentials Password")
        }

        // create a token
        const secretKey: string |  undefined = process.env.SECRET_ACCESS_KEY;

        const payload: userPayload = {
            id: userExists._id,
            email: userExists.email
        };

        let access_token;

        if (secretKey) {
            access_token = jwt.sign(payload, secretKey, {expiresIn: "1h", algorithm: "HS256"});
        }

        return res
        .status(200)
        .json({
            msg: "Login is Success",
            token: access_token,
            data: userExists
        })

    } catch (error:any) {
        return res
        .status(500)
        .json({
            msg: error.message
        })
    }
}



/**
 * @usage : get User Info
 * @method : POST
 * @url : http://localhost:9000/users/me
 * @param : no-params
 * @access : PRIVATE
 */

export const getUserInfo = async (req:Request, res:Response) => {
    try {

        const decodedUser:any = req.headers["user"]

        if (!decodedUser) {
            throw new Error("User is not found")
        }

        const userId = decodedUser.id
        const mongoUserId = new mongoose.Types.ObjectId(userId);

        const user: IUser | undefined | null = await User.findById(mongoUserId);

        if (!user) {
            throw new Error("User is not found")
        }

        return res
        .status(200)
        .json({data: user})
    } catch (error:any) {
        return res
        .status(500)
        .json({
            msg: error.message
        })
    }
}