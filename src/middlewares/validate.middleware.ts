import { NextFunction, Request, Response } from "express";
import { IContact } from "../models/IContact";
import { IGroup } from "../models/IGroup";
import { IUser } from "../models/IUser";

// : { parseAsync: (arg0: any) => IContact | PromiseLike<IContact> | IGroup | PromiseLike<IGroup>; }

// : { parseAsync: (arg0: any) => IContact | PromiseLike<IContact> | IGroup | PromiseLike<IGroup> | IUser | PromiseLike<IUser>; }

const validate = (schema:any) => async (req:Request, res:Response, next:NextFunction) => {
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        next()
    } catch (error:any) {
        const message = error?.errors[0]?.message;
        const extraDetails = error?.errors[0]?.message + "Fill the input properly";
        const status = 422;
        
        // next({
        //     message,
        //     extraDetails,
        //     status
        // })
        
        // res.status(400).json({
        //     msg: error
        // })

        return res
        .status(status)
        .json({
            message
        })
    }
}

export default validate;