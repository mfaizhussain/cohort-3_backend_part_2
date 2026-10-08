import mongoose from "mongoose";
import config from "./config.js";


export default async function connecttoDB() {

    await mongoose.connect(
        config.MONGO_URI
    );

    console.log("DB is connected");
    
    
}