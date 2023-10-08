import { NextFunction } from "connect";
import { Request, Response } from "express-serve-static-core";
import JWT from "../../utils/jwt";
import constants from "../../bin/constants";
import { UserSessionPayload } from "../../structures/types/jwt-types";

export default class SessionMiddleware {
    public static async verifySessionToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.headers.authorization) throw new Error("Unauthorized");
            const sessionToken = req.headers.authorization.split(" ")[1];
            const session = JWT.verifyToken(sessionToken, constants.JWT_SECRET) as UserSessionPayload;
            if(session.exp < Date.now()) throw new Error("Session expired");
            next();
        } catch (error) {
            next(error);
        }
    }
}