import z from "zod";


export const signupSchema =  z.object({
    username: z.string().min(1, 'username required'),
    email : z.email('invalid email'),
    password: z.string().min(6, 'Atleast 6 digit required')
});

export type SignUpInputType = z.infer<typeof signupSchema>