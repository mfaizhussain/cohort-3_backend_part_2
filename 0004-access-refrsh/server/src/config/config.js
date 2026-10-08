import dotenv from "dotenv";

dotenv.config({ path: new URL("../.env", import.meta.url) });

const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: Number(process.env.PORT) || 4000,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
};

export default config;