import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const databaseName = process.env.MONGO_DB || "infnet_telias";
const port = process.env.MONGO_PORT || 27017;

const connectionString = `mongodb://127.0.0.1:${port}/${databaseName}`;

mongoose.connect(connectionString);

const db = mongoose.connection;
export default db;