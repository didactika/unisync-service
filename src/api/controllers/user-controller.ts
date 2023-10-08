import { log } from "console";
import { Request, Response } from "express-serve-static-core";
import User from "../../structures/classes/models-classes/user-class";

/**
 * @class UserController
 * @description Controller for the user model
 */
export default class UserController {

    public static async create(req: Request, res: Response): Promise<void> {
        const { username, email, password } = req.body;
        try {
            if (!username || !email || !password || !username.trim() || !email.trim() || !password.trim())
                throw new Error("Invalid request body");

            const newUser = await new User({ username, email, password }).Create();
            res.status(201).json(newUser);
        } catch (error) {
            if (error instanceof Error) {
                log(error);
                res.status(400).json(error.message);
            }
        }
    }
}