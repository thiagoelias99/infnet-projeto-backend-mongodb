import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import chalk from "chalk";
import http from "http";
import { admin } from "../../adminJs";
import expressServer from "..";
import { MongoClient } from "../../databases/mongoose";
import { INotepad } from "../../models/Notepad";
// import joinRoomListener from "./listeners/joinRoomListener";
// import updateContentListener from "./listeners/updateContentListener";

const port = process.env.PORT || 3333;
const apiVersion = "v1";
const apiPrefix = `/api/${apiVersion}`;

const server = http.createServer(expressServer);

const io = new Server(server);

export type TIO = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>
export type TSocket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>

//Start socket.io server
io.on("connection", (socket: TSocket) => {
    console.log(`A user connected with id: ${socket.id}`);

    // joinRoomListener(io, socket);
    // updateContentListener(io, socket);

    socket.on("joinRoom", async (room: string) => {
        socket.join(room);

        const notepad = await MongoClient.getOrCreateNotepad(room);

        console.log(notepad);

        io.to(room).emit("currentContent", notepad.content);
    });
    
    socket.on("updateContent", async (data: INotepad) => {
        socket.broadcast.to(data.id).emit("currentContent", data.content);

        await MongoClient.saveNotepad(data);
    });

    //Disconnect
    socket.on("disconnect", (reason) => {
        console.log(`Cliente "${socket.id}" desconectado!
            Motivo: ${reason}`);
    });
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