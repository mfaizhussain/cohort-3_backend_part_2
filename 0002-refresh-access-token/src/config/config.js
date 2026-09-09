import dotenv from 'dotenv'

dotenv.config()



const config = {
    MONGO_URI: process.env.MONGO_URI,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    PORT: Number(process.env.PORT) || 4000
}

export default config;
