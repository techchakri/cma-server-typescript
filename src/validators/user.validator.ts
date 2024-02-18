import {z} from "zod";

export const registerValidatorSchema = z.object({
    username: z
    .string({
        required_error: "username is required"
    })
    .trim()
    .min(3, {message: "username must be atleast 3 characters"})
    .max(100, {message: "username must not be more than 100 characters"}),
    email: 
    z.string({
        required_error: "email is required"
    })
    .trim()
    .email({message: "Invalid email address"})
    .min(5, {message: "email must be atleast 5 characters"})
    .max(100, {message: "email must not be more than 100 characters"}),
    password: z
    .string({
        required_error: "password is required"
    })
    .trim()
    .min(5, {message: "password must be atleast 5 characters"})
    .max(50, {message: "password must not be more than 50 characters"})
})


export const loginValidatorSchema = z.object({
    email: 
    z.string({
        required_error: "email is required"
    })
    .trim()
    .email({message: "Invalid email address"})
    .min(5, {message: "email must be atleast 5 characters"})
    .max(100, {message: "email must not be more than 100 characters"}),
    password: z
    .string({
        required_error: "password is required"
    })
    .trim()
    .min(5, {message: "password must be atleast 5 characters"})
    .max(50, {message: "password must not be more than 50 characters"})
})