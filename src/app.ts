import express from "express";
import { MongooseDB } from "./config/mongoose";
import cors from "cors";
import { development } from "./config/development";
import helmet from "helmet";
import router from "./routes";
import { errorHandle } from "./middlewares/error-handle";
// Initialization
const app = express();
// Initialization database
MongooseDB();

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: [development.FRONTEND_URL],
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use("/api/v1/", router);

// Handle Error
app.use(errorHandle);

export default app;
