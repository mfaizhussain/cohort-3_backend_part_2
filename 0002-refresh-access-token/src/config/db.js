import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import config from './config.js';

// configDotenv()

export async function connecttoDB() {

    await mongoose.connect(config.MONGO_URI);

    console.log("DB is connected");
    
}