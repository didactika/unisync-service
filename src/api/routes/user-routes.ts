import express, { NextFunction, Request, Response } from "express";
import UserController from "../controllers/user-controller";

const userRoutes = express.Router({
    strict: true,
})

userRoutes.post("/", (req: Request, res: Response, next: NextFunction) => {
    UserController.create(req, res, next);
});

userRoutes.post("/login", (req: Request, res: Response, next: NextFunction) => {
    UserController.login(req, res, next);
});

export default userRoutes;