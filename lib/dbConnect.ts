import mongoose from "mongoose";



type connectionObject = {
    isConnected?:number
}


const dbConnection:connectionObject = {}


export async function dbConnect():Promise<void> {
    if(dbConnection.isConnected){
        console.log("Already connected to database");
        return ;

    }

    try{
        const db = await mongoose.connect(process.env.DB_URI || "" ,{})

       dbConnection.isConnected =  db.connections[0].readyState

       console.log(dbConnection.isConnected ? "Connected to database successfully" : "Failed to connect to database")
    }catch(err){
        console.log("Database connection Failed", err)
        process.exit(1)

    }
}

// dbConnect().catch(err => console.log("Database connection Failed",err))