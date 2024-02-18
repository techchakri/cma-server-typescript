import mongoose from "mongoose";
import { IContact } from "../models/IContact";

const contactSchema = new mongoose.Schema({
    userObj: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    groupId: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Contact = mongoose.model<IContact>("Contact", contactSchema)