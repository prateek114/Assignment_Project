import mongoose from "mongoose";

const connectDB= async ()=>{
    const DB_NAME="resumesave"
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`,{ useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection Failed ",error);
        process.exit(1);
    }
}

export default connectDB;