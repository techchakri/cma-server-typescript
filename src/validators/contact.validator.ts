import {z} from "zod"

const contactValidatorSchema = z.object({
    name: z
    .string({required_error: "Name is required"})
    .trim()
    .min(5, {message: "Name is atleast 5 characters"})
    .max(100, {message: "Name is not more than 100 characters"}),
    company: z
    .string({required_error: "Company name is required"})
    .trim()
    .min(5, {message: "Company name is atleast 5 characters"})
    .max(100, {message: "Company name is not more than 100 characters"}),
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({message: "Invalid email address"})
    .min(8, {message: "Email is atleast 8 characters"})
    .max(100, {message: "Email is not more than 100 characters"}),
    title: z
    .string({required_error: "Title is required"})
    .trim()
    .min(5, {message: "Title is atleast 5 characters"})
    .max(100, {message: "Title is not more than 100 characters"}),
    mobile: z
    .string({required_error: "Mobile is required"})
    .trim()
    .min(10, {message: "Mobile is atleast 10 characters"})
    .max(20, {message: "Title is not more than 20 characters"}),
    imageUrl: z
    .string({required_error: "ImageUrl is required"})
    .trim(),
    groupId: z
    .string({required_error: "GroupId is required"})
    .trim()
    .min(8, {message: "GroupId is atleast 8 characters"})
    .max(100, {message: "GroupId is not more than 100 characters"})
})

export {contactValidatorSchema}