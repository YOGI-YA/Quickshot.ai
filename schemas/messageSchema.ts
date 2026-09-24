import {z} from 'zod';


export const  MessageSchema = z.object({
    content:z.
    string()
    .min(10,{message:'message content must be 10 character long '})
    .max(300,{message:'message content must be no longer then 300 charcters'})
})