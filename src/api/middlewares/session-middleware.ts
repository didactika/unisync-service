import { NextFunction } from "connect";
import { Request, Response } from "express-serve-static-core";
import JWT from "../../utils/jwt";
import constants from "../../bin/constants";
import { UserSessionPayload } from "../../structures/types/jwt-types";
import httpClient from "http-response-client"
import ErrorMiddleware from "./error-middleware";
/**
 * @class SessionMiddleware
 */
export default class SessionMiddleware {
    /**
     * @method verifySessionToken
     * @description middleware to verify if the session token of the user is active
     * @memberof SessionMiddleware
     */
    public static async verifySessionToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.headers.authorization) throw new httpClient.errors.Unauthorized({msg: "No session token provided"});
            const sessionToken = req.headers.authorization.split(" ")[1];
            const session = JWT.VerifyToken(sessionToken, constants.JWT_SECRET) as UserSessionPayload;
            if(session.exp > Date.now()) throw new httpClient.errors.Unauthorized({msg: "Session expired"});
            next();
        } catch (error) {
            ErrorMiddleware.responseError(error as Error, res);
        }
    }
}