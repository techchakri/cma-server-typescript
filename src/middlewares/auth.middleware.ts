import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../schemas/userSchema";
import { IUser } from "../models/IUser";

export const auth = async (request: Request, response: Response, next:NextFunction) => {
    try {
        const token:any = request.headers["x-auth-token"];
        if (!token) {
            return response
            .status(401)
            .json({
                msg: "No Token Provided"
            })
        }
        
        const secretKey: string | undefined = process.env.SECRET_ACCESS_KEY;

        if (secretKey) {
            const decode:any = jwt.verify(token, secretKey, {algorithms: ["HS256"]});

            if (decode) {
                const user: IUser | undefined | null = await User.findById(decode.id)
            
                if (!user) {
                    return response
                    .status(401)
                    .json({
                        msg: "Unauthorized"
                    })
                }
                
                request.headers["user"] = decode
                return next() // forward to the router
            }
            else {
                return response
                .status(401)
                .json({
                    msg: "Unauthorized"
                })
            }

        }

        return response
        .status(401)
        .json({
            msg: "Unauthorized"
        })

    } catch (error:any) {
        return response
        .status(500)
        .json({
            msg: error.message
        })
    }
}