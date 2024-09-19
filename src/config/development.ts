import dotenv from "dotenv";
dotenv.config();

export const development = {
  PORT: process.env.PORT,
  BASE_URL: process.env.BASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URL: process.env.MONGO_URL as string,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
  JWT_SECRET_ACCESS_TOKEN: process.env.JWT_SECRET_ACCESS_TOKEN as string,
  JWT_SECRET_REFRESH_TOKEN: process.env.JWT_SECRET_REFRESH_TOKEN as string,
  JWT_SECRET_TOKEN_CHANGE_PASSWORD: process.env
    .JWT_SECRET_TOKEN_CHANGE_PASSWORD as string,
  NODEMAILER_HOST: process.env.NODEMAILER_HOST as string,
  NODEMAILER_PORT: process.env.NODEMAILER_PORT,
  NODEMAILER_SECURE: process.env.NODEMAILER_SECURE,
  NODEMAILER_AUTH_USER: process.env.NODEMAILER_AUTH_USER as string,
  NODEMAILER_AUTH_PASS: process.env.NODEMAILER_AUTH_PASS as string,
};
