import { INotepad } from "../../models/Notepad";
import { Notepads } from "./collections/Notepad";

export class MongoClient {

    static async saveNotepad(notepad: INotepad): Promise<void> {
        await Notepads.findByIdAndUpdate(notepad.id, {
            content: notepad.content
        });

        return new Promise((resolve) => {
            resolve();
        });
    }

    static async getOrCreateNotepad(id: string): Promise<INotepad> {
        return new Promise((resolve) => {
            Notepads.findById(id)
                .then((notepad) => {
                    if (notepad) {
                        resolve({
                            id: notepad.id,
                            content: notepad.content
                        });
                    } else {
                        const mongoNotepad = new Notepads({
                            _id: id,
                            content: ""
                        });
                        mongoNotepad.save();
                        resolve({
                            id: id,
                            content: ""
                        });
                    }
                });
        });
    }
}