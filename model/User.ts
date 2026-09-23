import { Schema,model,Document } from "mongoose";


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
const userSchema = new Schema<User>({
    username: {
        type:String,
        required:true

    },
    email: {
        type:String,
        required:true,
        unique:true

    },
    password: {
        type:String,
        required:true

    }
})


export const Message = model<IMessage>("Message",messageSchema)