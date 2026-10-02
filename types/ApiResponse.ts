import { IMessage } from "@/model/User";

export interface  ApiResponse {
    success: boolean;
    message: string;
    isAcceptionMessages?:boolean;
    messages?: Array<IMessage>
    
}