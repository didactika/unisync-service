import { NextFunction } from "connect";
import { Request, Response } from "express-serve-static-core";
import JWT from "../../utils/jwt";
import constants from "../../bin/constants";
import { UserSessionPayload } from "../../structures/types/jwt-types";
import httpClient from "http-response-client"
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
/**
 * @class SessionMiddleware
 */
export default class SessionMiddleware {
    /**
     * @method verifySessionToken
     * @description middleware to verify if the session token of the user is active
     * @memberof SessionMiddleware
     */
    public static verifySessionToken(req: Request, res: Response, next: NextFunction): void {
        try{
            if (!req.headers.authorization) next(new httpClient.errors.Unauthorized({msg: "No session token provided"}));
            const sessionToken = req.headers.authorization!.split(" ")[1];
            JWT.VerifyToken(sessionToken, constants.JWT_SECRET) as UserSessionPayload;
            next();
        }
        catch(error){
            if(error instanceof TokenExpiredError){
                next(new httpClient.errors.Unauthorized({msg: "Session expired"}));
            } else if(error instanceof JsonWebTokenError){
                next(new httpClient.errors.Unauthorized({msg: "Invalid token"}));
            }
            next(error);
        }
        
    }
}