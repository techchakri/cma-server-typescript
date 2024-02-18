import { Request, Response } from "express";
import { Group } from "../schemas/groupSchema";
import { IGroup } from "../models/IGroup";
import mongoose from "mongoose";

/**
 * @usage  : Get all groups
 * @method : GET
 * @url    : http://localhost:9000/groups
 * @param  : No-params
 * @access : PUBLIC
 */

export const getAllGroups = async (req:Request, res:Response) => {
    try {
        const groups:IGroup[] = await Group.find();

        return res
        .status(200)
        .json(groups)
    } catch (error:any) {
        return res
        .status(500)
        .json({
            message: error.message
        })
    }
}


/**
 * @usage  : Get group
 * @method : GET
 * @url    : http://localhost:9000/groups/:groupId
 * @param  : No-params
 * @access : PUBLIC
 */

export const getGroup = async (req:Request, res:Response) => {
    try {
        const {groupId} = req.params;
        const groupGroupId = new mongoose.Types.ObjectId(groupId);
        const group:IGroup|undefined|null = await Group.findById(groupGroupId);

        if (!group) {
            throw new Error("Group is not found")
        }

        return res
        .status(200)
        .json(group)

    } catch (error:any) {
        return res
        .status(500)
        .json({
            message: error.message
        })
    }
}



/**
 * @usage  : Create a group
 * @method : POST
 * @url    : http://localhost:9000/groups
 * @param  : name
 * @access : PUBLIC
 */

export const createGroup = async (req:Request, res:Response) => {
    try {
        
        // read the form data
        const {name} = req.body;

        // check if the group exists in db
        const groupExists:IGroup | undefined | null = await Group.findOne({ name })

        if (groupExists) {
            throw new Error("Group is already exists")
        }

        // create a group
        const group:IGroup = await Group.create({
            name
        })

        if (!group) {
            throw new Error("Group is not created")
        }

        return res
        .status(200)
        .json(group)

    } catch (error:any) {
        return res
        .status(500)
        .json({
            message: error.message
        });
    }
}
