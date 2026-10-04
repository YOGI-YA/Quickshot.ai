import 'next-auth'
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User{
        _id?:string;
        isVerified?:boolean;
        isAcceptionMessages?:boolean;
        username?:string;
    }
    interface session{
        user:{
            _id?:string;
        isVerified?:boolean;
        isAcceptionMessages?:boolean;
        username?:string;
        } & DefaultSession['user']
    }

}