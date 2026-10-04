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
              const user = await dbConnect()
                try {
                    await UserModel.findOne({
                        $or:[
                            {email:credentials.indetifier},
                            {username:credentials.indetifier},
                            
                        ]
                    })
                    if(!user){
                        throw new Error("No user found with this email")
                    }

                    if(!user.isVerified){
                        throw new Error('Please verify your account before login')
                    }

                   const isPasswordCorrect =  await bcrypt.compare(credentials.password,user.Password)
                   if(isPasswordCorrect){
                    return user
                   }else{
                    throw new Error('Incorrect Password')
                   }
                    
                } catch (err:any) {
                    throw new Error()
                    
                }

            }
        })
    ],
    callbacks:{
        async jwt({token,user}) {
            if(user){
                token._id = user._id?.toString(),
                token.isVerified = user.isVerified
            }
            return token
        },
        async session({session,token}) {
            return session
        },
        
    },
    pages:{
        signIn:'/sign-in'
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET
}