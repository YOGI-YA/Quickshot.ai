import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse> {
    try {
        return {success:true,message:"verification email send successfully"}

        
    } catch (err) {
        console.error("Error sending verification email" ,err)
        return {success:false,message:"failed to send verification email"}
        
    }
    
}