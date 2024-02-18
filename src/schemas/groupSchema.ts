import mongoose from "mongoose";
import { IGroup } from "../models/IGroup";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})


export const Group = mongoose.model<IGroup>("Group", groupSchema)