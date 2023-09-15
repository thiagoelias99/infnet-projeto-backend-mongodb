import { Server } from "socket.io";
import chalk from "chalk";
import http from "http";
import { admin } from "../../adminJs";
import expressServer from "..";

const port = process.env.PORT || 3333;
const apiVersion = "v1";
const apiPrefix = `/api/${apiVersion}`;

const server = http.createServer(expressServer);

const io = new Server(server);

//Start socket.io server
io.on("connection", (socket) => {
    console.log(`A user connected with id: ${socket.id}`);
});

server.listen(port, () => {  
    const log = console.log;
    setTimeout(() => {
        console.clear();
        const date = new Date();
        log(`Node server started in ${date.toLocaleString()} at ${chalk.blue(`http://localhost:${port}${apiPrefix}`)}`);
        log(`Access ${chalk.bold.blue("Api Documentation")} at ${chalk.blue(`http://localhost:${port}${apiPrefix}/docs`)}`);
        log(`Access ${chalk.bold.blue("Administration Panel")} at ${chalk.blue(`http://localhost:${port}${admin.options.rootPath}`)}`);
        log(`Access ${chalk.bold.blue("Login Page")} at ${chalk.blue(`http://localhost:${port}/login`)}`);
        log(`\nDeveloped by ${chalk.bold.green("Thiago Elias")}`);
        log("Repo https://github.com/thiagoelias99/infnet-projeto-backend-typescript\n\n\n");
    }, 2000);
});

export default server;