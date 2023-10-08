import express, { Request, Response } from "express";
import UserController from "../controllers/user-controller";

const userRoutes = express.Router({
    strict: true,
})

userRoutes.post("/", (req: Request, res: Response) => {
    UserController.create(req, res);
});

userRoutes.post("/login", (req: Request, res: Response) => {
    UserController.login(req, res);
});

export default userRoutes;