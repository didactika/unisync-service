import { NextFunction, Request, Response } from "express";
import { Forbidden } from "http-response-client/lib/errors/client";
import JWT from "../../../classes/utils/jwt";
import { TokenSessionData } from "../../../types/classes/controller/auth-controller-types";

export default class verifySessionMiddleware {
  public static execute(req: Request, res: Response, next: NextFunction) {
    try {
      const userToken = req.headers.authorization;
      if (!userToken) throw new Forbidden({ msg: "Token not found" });
      if (userToken.split(" ")[0] !== "Bearer") throw new Forbidden({ msg: "Invalid token" });
      const token = userToken.split(" ")[1];
      const sessionData = JWT.verifyToken(token) as TokenSessionData;
      if (!sessionData) throw new Forbidden({ msg: "Invalid token" });
      if (sessionData.exp && sessionData.exp < Math.floor(Date.now() / 1000)) throw new Forbidden({ msg: "Session expired" });
      req.body.sessionData = sessionData;
      next();
    } catch (error) {
      next(error);
    }
  }
}
