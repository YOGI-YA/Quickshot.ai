import {NextAuthOptions} from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { id } from "zod/locales";

export const authOptions : NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id : "credentails",
            name: "Credentials",
            credentials:{
                username: {label:"Email",type:"text"},
                password: {label:"Password", type:"password"}
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect()
                try {
                    
                } catch (err:any) {
                    throw new Error()
                    
                }

            }
        })
    ]
}