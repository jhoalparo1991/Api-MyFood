import mongoose from "mongoose";
import { development } from "./development";
import { logger } from "./winston";

export const MongooseDB = async() => {
 return await mongoose
    .connect(development.MONGO_URL)
    .then((response) => {
      console.log("Database is connected ");
      logger.info("Connected to MongoDB ");
    })
    .catch((err) => logger.error(err.message));
};
