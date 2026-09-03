import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

export async function  connectDB() {

    await mongoose.connect(
        process.env.MONGO_URI
    );

    console.log("DB is connected");
    
    
};