import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect()

    try{
     const {username,email,password}  =    await request.json()
     const existingUserVerifiedByUsername = await UserModel.findOne({username,isVerified:true})

     if(existingUserVerifiedByUsername){
        return Response.json({
            success:false,
            message:"Username is already taken"
        }),{status:400}
     }

     const existingUserVerifiedByEmail =  await UserModel.findOne({email})

     if(existingUserVerifiedByEmail){
        return Response.json({
            success:false,
            message:"User with this email already exists"

        }),{status:400}
     }
     else{
       const hashedPassword =  await bcrypt.hash(password,10)
     }
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


