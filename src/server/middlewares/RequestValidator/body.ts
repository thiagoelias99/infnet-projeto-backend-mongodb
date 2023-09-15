import { RequestHandler } from "express";
import { Student, Course, Login } from "./models";

const body: RequestHandler = (req, res, next) => {
    const { url, body } = req;
    console.log(req);

    const schema = getSchemaFromUrl(url);
    if (schema) {
        console.log(body);
        const { error } = schema.validate(body);
        if (error) {
            next(error);
        }
        next();
    } else{
        next();
    }
};

function getSchemaFromUrl(url: string) {
    if (url.startsWith("/students")) { return Student; }
    if (url.startsWith("/courses")) { return Course; }
    if (url.startsWith("/login")) { return Login; }
}

export default body;