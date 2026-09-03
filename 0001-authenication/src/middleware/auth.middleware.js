import  jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { configDotenv } from "dotenv";

configDotenv();



export const authenticate = async (req, res, next) =>{

    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({
            message:"Token is not find"
        })
    }
    

    const data = jwt.verify(token,process.env.JWT_SECRET);

   

    const user = await userModel.findById(data.id);

    req.user = user;
    
    next();

}