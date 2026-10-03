import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { success } from "zod";

export async function POST(request: Request) {
    await dbConnect()

    try{

    }catch(error){
        console.log('Error registring user',error)
        return Response.json(
            {
                success:false,
                message:"Error registring user"
            },
            {
                status:500
            }
        )

    }
}


