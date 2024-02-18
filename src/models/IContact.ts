import mongoose from "mongoose";

export interface IContact {
    userObj: mongoose.Schema.Types.ObjectId;
    name: string;
    company: string;
    email: string;
    title: string;
    mobile: string;
    imageUrl: string;
    groupId: string;
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date; 
}