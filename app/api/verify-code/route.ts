import {dbConnect} from "@/lib/dbConnect";
import {UserModel} from "@/model/User";


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

        const isCodeValid = user.verifyCode === code;

        const isCodeExpired = user.verifyCodeExp && new Date(user.verifyCodeExp) < new Date();



        if(isCodeValid && isCodeExpired) {
            user.isVerified = true;
            await user.save();
            return Response.json({
                success:true,
                message:'User verified successfully'
            },{status:200})
        }else if(!isCodeExpired){
            return Response.json({
                success:false,
                message: 'Verification code has expired'
            },{status:400})
        }else{
            return Response.json({
                success:false,
                message: 'Invalid verification code'
            },{status:400})
        }


    }catch(err){
        console.log("Error verifying code",err);
        return Response.json({
            success:false,
            message: 'Internal Server Error',
        },{status:500})

    }
}
