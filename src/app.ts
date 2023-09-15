import { syncWithDatabase } from "./databases/sequelize";
import server from "./server/sockets";

function startApp() {
    server;
    syncWithDatabase();
}

try {
    startApp();
} catch (error) {
    console.log("Server execution failed :(");
    console.log(error);
}