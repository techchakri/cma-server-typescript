import mongoose from "mongoose";

async function connectDB(dbName:string,dbUrl:string) {
    try {
        const connectionInstance = await mongoose.connect(`${dbUrl}/${dbName}`)
        console.log(`DB connected !! DB HOST : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`DB connection Failed!! ${error}`)
        process.exit(1) // force-stop express server
    }
}

export {connectDB}