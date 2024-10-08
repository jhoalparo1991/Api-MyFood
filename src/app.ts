import express from "express";
import cors from "cors";
import { development } from "./config/development";
import helmet from "helmet";
import router from "./routes";
import { errorHandle } from "./middlewares/error-handle";
// Initialization
const app = express();
// Initialization database

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: [development.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1/", router);

// Handle Error
app.use(errorHandle);

export default app;
