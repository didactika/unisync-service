import { NextFunction, Request, Response } from "express";
import { Forbidden } from "http-response-client/lib/errors/client";
import { EUserRole } from "../../../enums/user-role-enum";

export default class isAdminMiddleware {
  public static execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { sessionData } = req.body;
      if (!sessionData) throw new Forbidden({ msg: "Invalid Session Data" });
      if (!sessionData.role) throw new Forbidden({ msg: "No role found" });
      if (sessionData.role !== EUserRole.ADMIN) throw new Forbidden({ msg: "Not an admin" });
      next();
    } catch (error) {
      next(error);
    }
  }
}
