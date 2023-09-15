import express from "express";
import path from "path";
const studentViewRouter = express.Router();

const routePathStudent = "/students";
const routePathCourse = "/courses";

const mainPage = path.join(__dirname, "./main.html");
const editorPage = path.join(__dirname, "./editor.html");

studentViewRouter.route(routePathStudent)
    .get((req, res) => {
        res.sendFile(mainPage);
    });

studentViewRouter.route(`${routePathCourse}/notes/:uuid`)
    .get((req, res) => {
        res.sendFile(editorPage);
    });

export default studentViewRouter;