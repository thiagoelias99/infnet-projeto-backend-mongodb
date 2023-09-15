import { INotepad } from "../../../models/Notepad";

import { Schema } from "mongoose";
import db from "../config";

interface IMongoAccount extends Omit<INotepad, "id"> {
    _id: string
}

const notepadSchema = new Schema<IMongoAccount>(
    {
        _id: { type: String },
        content: { type: String, required: true },
    },
    {
        versionKey: false
    }
);

export const Notepads = db.model<INotepad>("notepads", notepadSchema);