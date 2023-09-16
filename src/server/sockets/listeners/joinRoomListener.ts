import { TIO, TSocket } from "..";
import { MongoClient } from "../../../databases/mongoose";


export default function joinRoomListener(io: TIO,socket: TSocket) {
    socket.on("joinRoom", async (room: string) => {
        socket.join(room);

        const notepad = await MongoClient.getOrCreateNotepad(room);

        console.log(notepad);

        io.to(room).emit("currentContent", notepad.content);
    });
}