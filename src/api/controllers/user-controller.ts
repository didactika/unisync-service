import { log } from "console";
import { Request, Response } from "express-serve-static-core";
import User from "../../structures/classes/models-classes/user-class";
import JWT from "../../utils/jwt";
import PasswordHandler from "../../utils/password-handler";
import constants from "../../bin/constants";

/**
 * @class UserController
 * @description Controller for the user model
 */
export default class UserController {

    /**
     * Create a new user
     * @memberof UserController
     */
    public static async create(req: Request, res: Response): Promise<void> {
        const { username, email, password } = req.body;
        try {
            if (!username || !email || !password || !username.trim() || !email.trim() || !password.trim())
                throw new Error("Invalid request body");

            const newUser = new User({ username, email, password });
            await newUser.Create();
            res.status(201).json(newUser);
        } catch (error) {
            if (error instanceof Error) {
                log(error);
                res.status(400).json(error.message);
            }
        }
    }

    /**
     * Login a user
     * @memberof UserController
     */
    public static async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password } = req.body;
            const userToLogin = await User.ReadOneByFilter(username ? { username } : { email });

            if ((!password || !password.trim())
                || ((!username || !username.trim())
                    && (!email || !email.trim())))
                throw new Error("Invalid request body");

            if (!userToLogin) throw new Error("User not found");

            if (!PasswordHandler.ComparePasswords(password, userToLogin.password))
                throw new Error("Invalid password");

            const sessionToken = JWT.GenerateAccessToken(
                {
                    uuid: userToLogin.uuid,
                    username: userToLogin.username,
                    email: userToLogin.email,
                },
                constants.JWT_SECRET,
                constants.JWT_EXPIRES_IN
            );
            res.status(200).json({ ...userToLogin, sessionToken });
        } catch (error) {
            if (error instanceof Error) {
                log(error);
                res.status(400).json(error.message);
            }
        }
    }
}