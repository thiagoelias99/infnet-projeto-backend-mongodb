import express from "express";
import cors from "cors";
import morgan from "morgan";
import chalk from "chalk";
import * as dotenv from "dotenv";
import router from "./routes";
import { errorHandler } from "./middlewares";
import bodyParser from "body-parser";
import publicRouter from "./routes/public";

import { admin, adminRouter } from "../adminJs";

dotenv.config();
const server = express();
const port = process.env.PORT || 3333;

const apiVersion = "v1";
const apiPrefix = `/api/${apiVersion}`;

// CORS middleware configuration
server.use(cors());

// Body Parser middleware configuration
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Log middleware configuration
server.use(morgan("dev"));

//Admin Js
server.use(admin.options.rootPath, adminRouter);

// Routing configuration
server.use(publicRouter);
server.use(apiPrefix, router);

// Errors Handler middleware configuration
server.use(errorHandler);

server.listen(port, () => {  
    const log = console.log;
    setTimeout(() => {
        console.clear();
        const date = new Date();
        log(`Node server started in ${date.toLocaleString()} at ${chalk.blue(`http://localhost:${port}${apiPrefix}`)}`);
        log(`Access ${chalk.bold.blue("Api Documentation")} at ${chalk.blue(`http://localhost:${port}${apiPrefix}`)}`);
        log(`Access ${chalk.bold.blue("Administration Panel")} at ${chalk.blue(`http://localhost:${port}${admin.options.rootPath}`)}`);
        log(`Access ${chalk.bold.blue("Login Page")} at ${chalk.blue(`http://localhost:${port}/login`)}`);
        log(`\nDeveloped by ${chalk.bold.green("Thiago Elias")}`);
        log("Repo https://github.com/thiagoelias99/infnet-projeto-backend-typescript\n\n\n");
    }, 2000);
});

export default server;