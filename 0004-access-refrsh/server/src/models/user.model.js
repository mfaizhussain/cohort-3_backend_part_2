import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                
        },
        passwordHash: {
            type: String,
            required: true,
        },
         refreshToken: {
            type: String,
        }
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;