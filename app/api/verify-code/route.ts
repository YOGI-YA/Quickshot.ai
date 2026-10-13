import {dbConnect} from "@/lib/dbConnect";
import {UserModel} from "@model/User";


export async function POST(request:Request) {
    await dbConnect()
    try{

        const {username,code} = await request.json();

        const decodedUsername = decodeURIComponent(username)

        const user = await UserModel.findOne({username:decodedUsername,isVerified:false})


        if(!user){
            return Response.json({
                success:false,
                message:'User not found or already verified'
            },{status:404})
        }

        const isCodeValid = user.verificationCode === code

        const isCodeExpired = user.verificationCodeExpiry && new Date(user.verificationCodeExpiry) < new Date()

    }catch(err){
        console.log("Error verifying code",err);
        return Response.json({
            success:false,
            message: 'Internal Server Error',
        },{status:500})

    }
}
