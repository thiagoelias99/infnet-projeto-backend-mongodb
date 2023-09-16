import { TIO, TSocket } from "..";
import { MongoClient } from "../../../databases/mongoose";
import { INotepad } from "../../../models/Notepad";


export default function updateContentListener(io: TIO,socket: TSocket) {
    socket.on("updateContent", async (data: INotepad) => {
        await MongoClient.saveNotepad(data);

        socket.broadcast.to(data.id).emit("currentContent", data.content);
    });
}