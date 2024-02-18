import { Request, Response } from "express";
import { Contact } from "../schemas/contactSchema";
import { IContact } from "../models/IContact";
import mongoose from "mongoose";
import { User } from "../schemas/userSchema";
import { IUser } from "../models/IUser";

const getUserObjId = async (req:Request, res:Response):Promise<IUser | any> => {
    const decodedUser:any = req.headers["user"];

    if (!decodedUser) {
        throw new Error("user is not found")
    }
    
    const userId = decodedUser.id;
    if (!userId) {
        throw new Error("user is not found")
    }
    const mongoUserId = new mongoose.Types.ObjectId(userId);
    const user: IUser | undefined | null = await User.findById(mongoUserId);
    if (!user) {
        throw new Error("user is not found")
    }
    return user
}


/**
 * @usage  : Get all contacts
 * @method : GET
 * @url    : http://localhost:9000/contacts
 * @param  : No-params
 * @access : PRIVATE
 */

export const getAllContacts = async (req:Request, res:Response) => {
    try {

        const user: IUser | any = await getUserObjId(req, res);

        if (!user) {
            throw new Error("user is not found")
        }

        const contacts:IContact[] = await Contact.find({userObj: new mongoose.Types.ObjectId(user._id)});


        return res
        .status(200)
        .json(contacts);
    } catch (error:any) {
        return res
        .status(500)
        .json({
            message: error.message
        });
    }
}


/**
 * @usage  : Get contact
 * @method : GET
 * @url    : http://localhost:9000/contacts/:contactId
 * @param  : No-params
 * @access : PRIVATE
 */

export const getContact = async (req:Request, res:Response) => {
    try {

        const user: IUser | any = await getUserObjId(req, res);

        if (!user) {
            throw new Error("user is not found")
        }

        const {contactId} = req.params;

        const mongoContactId = new mongoose.Types.ObjectId(contactId);

        const mongoUserId = new mongoose.Types.ObjectId(user._id);

        const contact:IContact | undefined | null = await Contact.findOne({
            _id: mongoContactId,
            userObj: mongoUserId
        });

        if (!contact) {
            throw new Error("Contact is not found")
        }
        
        return res
        .status(200)
        .json(contact)

    } catch (error:any) {
        return res
        .status(500)
        .json({
            message: error.message
        })
    }
}



/**
 * @usage  : Create a contact
 * @method : POST
 * @url    : http://localhost:9000/contacts
 * @param  : name, imageUrl, mobile, email, company, title, groupId
 * @access : PRIVATE
 */

export const createContact = async (req:Request, res:Response) => {
    try {

        const user:IUser | any = await getUserObjId(req,res);

        if (!user) {
            throw new Error("user is not found");
        }

        // read the form data
        const {name, imageUrl, mobile, email, company, title, groupId} = req.body;

        // check if the mobile number or email address with userObj exists
        const contactExists:IContact | undefined | null = await Contact.findOne({$or:[{$and: [{mobile},{userObj:user._id}]},{$and: [{email},{userObj:user._id}]}]})

        if (contactExists) {
            throw new Error("contact is already exist with some mobile number or email address!");
        }

        // create a contact
        const contact:IContact = await Contact.create({
            userObj: user._id,
            name,
            imageUrl,
            mobile,
            email,
            company,
            title,
            groupId
        })

        if (!contact) {
            throw new Error("Contact is not created")
        }
        
        res
        .status(201)
        .json(contact)
    } catch (error:any) {
        return res
        .status(500)
        .json({
            message: error.message
        })
    }
}



/**
 * @usage  : Update a contact
 * @method : PUT
 * @url    : http://localhost:9000/contacts/:contactId
 * @param  : name, imageUrl, mobile, email, company, title, groupId
 * @access : PRIVATE
 */

export const updateContact = async (req:Request, res:Response) => {
    try {

        const user:IUser | any = await getUserObjId(req, res);
        if (!user) {
            throw new Error("user is not found")
        }

        const {contactId} = req.params;
        const mongoContactId = new mongoose.Types.ObjectId(contactId);
        const mongoUserId = new mongoose.Types.ObjectId(user._id);

        // read the form data
        const {name, imageUrl, mobile, email, company, title, groupId} = req.body;

        // check if the contact is exists
        const contact:IContact | undefined | null = await Contact.findOne({
            _id: mongoContactId,
            userObj: mongoUserId
        });

        if (!contact) {
            throw new Error("Contact is not found")
        }

        // update the contact

        const updatedContact:IContact | undefined | null = await Contact.findByIdAndUpdate(mongoContactId, {
            $set: {
                userObj: user._id,
                name, 
                imageUrl, 
                mobile, 
                email, 
                company, 
                title, 
                groupId
            }
        }, {new: true});

        return res
        .status(200)
        .json(updatedContact)

    } catch (error:any) {
        return res
        .status(500)
        .json({
            message: error.message
        })
    }
}

/**
 * @usage  : Delete a contact
 * @method : DELETE
 * @url    : http://localhost:9000/contacts/:contactId
 * @param  : No-params
 * @access : PRIVATE
 */

export const deleteContact = async (req:Request, res:Response) => {
    try {

        const user: IUser | any = await getUserObjId(req, res);
        if (!user) {
            throw new Error("user is not found")
        } 

        const {contactId} = req.params;
        const mongoContactId = new mongoose.Types.ObjectId(contactId);
        const mongoUserId = new mongoose.Types.ObjectId(user._id);
        const contact:IContact | undefined | null = await Contact.findOne({
            _id: mongoContactId,
            userObj: mongoUserId
        });

        if (!contact) {
            throw new Error("Contact is not found")
        }

        // delete the contact
        const deletedContact = await Contact.findByIdAndDelete(mongoContactId);

        if (deletedContact) {
        return res
        .status(200)
        .json({})
        }
    } catch (error:any) {
        return res
        .status(500)
        .json({
            message: error.message
        })
    }
}
