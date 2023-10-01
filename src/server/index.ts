import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import router from "./routes";
import { errorHandler } from "./middlewares";
import publicRouter from "./routes/public";
import studentViewRouter from "./routes/studentsViewRouter";

import { admin, adminRouter } from "../adminJs";

dotenv.config();
const expressServer = express();
// const port = process.env.PORT || 3333;

const apiVersion = "v1";
const apiPrefix = `/api/${apiVersion}`;

// CORS middleware configuration
expressServer.use(cors());

// Log middleware configuration
expressServer.use(morgan("dev"));

//Admin Js
expressServer.use(admin.options.rootPath, adminRouter);

// Body Parser middleware configuration
expressServer.use(express.urlencoded({ extended: false }));
expressServer.use(express.json());

// Routing configuration
expressServer.use(publicRouter);
expressServer.use(studentViewRouter);
expressServer.use(apiPrefix, router);

// Errors Handler middleware configuration
expressServer.use(errorHandler);

export default expressServer;