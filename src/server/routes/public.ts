import express from "express";
import path from "path";

const publicRouter = express.Router();

const loginPage = path.join(__dirname, "./loginForm.html");
const signUpPage = path.join(__dirname, "./signUpForm.html");


// publicRouter.use("/docs", swaggerUi.serve);
publicRouter.get("/login", (req, res) => {
    res.sendFile(loginPage);
});

// publicRouter.use("/docs", swaggerUi.serve);
publicRouter.get("/signUp", (req, res) => {
    res.sendFile(signUpPage);
});

export default publicRouter;