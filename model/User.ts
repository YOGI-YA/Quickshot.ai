import { Schema,model,Document } from "mongoose";


interface IMessage extends Document {
    content : string,
    createdAt : Date,
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


export const Message = model<IMessage>("Message",messageSchema)