import mongoose from "mongoose";
import { development } from "./development";

export const MongooseDB = async() => {
 return await mongoose
    .connect(development.MONGO_URL)
};
