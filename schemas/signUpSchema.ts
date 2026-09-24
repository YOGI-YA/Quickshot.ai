import {regex, z} from 'zod';

export const usernameValidation = z.
string()
.min(3, "username must contain more then 3 charcters")
.max(20,"username shouldn't exceed more then 20 charcters")
regex(/^[a-zA-Z0-9_]{3,20}$/)


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"Password must be atleast 6 charscters"})
})