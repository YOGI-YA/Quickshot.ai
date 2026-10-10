import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import {success, z} from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { queryTraceSpans } from "next/dist/build/swc/generated-native";


const usernameQuerySchema = z.object({
    username: usernameValidation
}) 

export async function GET(request:Request) {

    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }

        const result = usernameQuerySchema.safeParse(queryParam)

        if(!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success:false,
                message: usernameErrors?.length > 0 
                ?usernameErrors.join(', ')
                : 'Invalid query parameters'
            },{status:400})
        }
        

        const  {username} = result.data

        const existedVerifiedUser =  await UserModel.findOne({
            username,isVerified:true
        })

        if(existedVerifiedUser){
            return Response.json({
                success:false,
                message:'Usernmae is already taken',
                
            },
        {status:400})
        }

        return Response.json({
                success:true,
                message:'Usernmae is unique',
                
            },
        {status:200})
        
    } catch (error) {
        console.error("Error checking username",error);
        return Response.json(
            {
                success:false,
                message: "Error checking username"
            },
            {
                status:500
            }
        )
        
    }

}