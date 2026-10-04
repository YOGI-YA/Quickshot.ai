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
                username: {label:"Username",type:"text",placeholder:"j smith"},
                password: {label:"Password", type:"password"}
            }
        })
    ]
}