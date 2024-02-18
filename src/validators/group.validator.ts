import {z} from "zod"

const groupValidatorSchema = z.object({
    name: z
    .string({required_error: "Name is required"})
    .trim()
    .min(5, {message: "Name is atleast 5 characters"})
    .max(100, {message: "Name is not more than 100 characters"})
})

export {groupValidatorSchema}