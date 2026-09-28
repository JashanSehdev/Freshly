import z from "zod";


export const loginSchema =  z.object({
    email : z.email('invalid email'),
    password: z.string().min(6, 'Atleast 6 digit required')
});

export type LoginInputType = z.infer<typeof loginSchema>