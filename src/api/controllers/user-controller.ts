import { log } from "console";
import { Request, Response } from "express-serve-static-core";
import User from "../../structures/classes/models-classes/user-class";
import JWT from "../../utils/jwt";
import PasswordHandler from "../../utils/password-handler";
import constants from "../../bin/constants";
import httpClient from "http-response-client"
import ErrorMiddleware from "../middlewares/error-middleware";
import { NextFunction } from "express";

/**
 * @class UserController
 * @description Controller for the user model
 */
export default class UserController {

    /**
     * Create a new user
     * @memberof UserController
     */
    public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { username, email, password } = req.body;
        try {
            const newUser = new User({ username, email, password });
            await newUser.Create();
            res.status(201).json({
                uuid: newUser.uuid,
                username: newUser.username,
                email: newUser.email,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Login a user
     * @memberof UserController
     */
    public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, email, password } = req.body;
            const userToLogin = await User.ReadOneByFilter(username ? { username } : { email });

            if ((!password || !password.trim())
                || ((!username || !username.trim())
                    && (!email || !email.trim())))
                throw new httpClient.errors.BadRequest({ msg: "Invalid request body" });

            if (!userToLogin) throw new httpClient.errors.NotFound({ msg: "User not found" });

            if (!PasswordHandler.ComparePasswords(password, userToLogin.password))
                throw new httpClient.errors.Unauthorized({ msg: "Invalid password" });

            const sessionToken = JWT.GenerateAccessToken(
                {
                    uuid: userToLogin.uuid,
                    username: userToLogin.username,
                    email: userToLogin.email,
                },
                constants.JWT_SECRET,
                constants.JWT_EXPIRES_IN
            );
            res.status(200).json({
                uuid: userToLogin.username,
                username: userToLogin.username,
                email: userToLogin.email,
                sessionToken
            });
        } catch (error) {
            next(error);
        }
    }
}