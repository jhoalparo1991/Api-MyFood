import dotenv from 'dotenv'
dotenv.config();

export const development = {
    PORT : process.env.PORT,
    NODE_ENV:process.env.NODE_ENV,
    MONGO_URL:process.env.MONGO_URL as string,
    FRONTEND_URL:process.env.FRONTEND_URL as string,
    JWT_SECRET_ACCESS_TOKEN:process.env.JWT_SECRET_ACCESS_TOKEN as string,
    JWT_SECRET_REFRESH_TOKEN:process.env.JWT_SECRET_REFRESH_TOKEN as string,
}