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

     const verifyCode = Math.floor(100000 + Math.random()*900000).toString()

     if(existingUserVerifiedByEmail){
        return Response.json({
            success:false,
            message:"User with this email already exists"

        }),{status:400}
     }
     else{
       const hashedPassword =  await bcrypt.hash(password,10)
       const expirayDate = new Date()
       expirayDate.setHours(expirayDate.getHours()+1)


       const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExp:expirayDate,
        isVerified:false,
        isAcceptingMessage:true,
        message:[]

       })

       await newUser.save()
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


