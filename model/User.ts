import mongoose, { Schema,Document } from "mongoose";


interface IMessage extends Document {
    content : string;
    createdAt : Date;
}

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExp:Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    message: IMessage[]


}


const messageSchema = new Schema<IMessage>({
    content: {
        type:String,
        required:true
        
    },
    createdAt: {
        type:Date,
        default:Date.now
        
    }
})

export const Message = mongoose.model<IMessage>("Message",messageSchema)
const userSchema = new Schema<User>({
    username: {
        type:String,
        required:[true,"Please enter a unique username"],
        trim:true,
        unique:true

    },
    email: {
        type:String,
        required:[true,"Email is required "],
        trim:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please use a valid email"],
        unique:true

    },
    password: {
        type:String,
        required:[true,"password is required"],

    },
    verifyCode: {
        type:String,
        required:[true,"verifyCode is required"],

    },
    verifyCodeExp: {
        type:Date,
        required:[true,"verifyCode expiry is required"],

    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    message:[messageSchema]
})


export const UserModel = (mongoose.models.User as mongoose.Model<User>) ||     mongoose.model<User>("User",userSchema)

