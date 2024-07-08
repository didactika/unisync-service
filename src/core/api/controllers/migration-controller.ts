import { NextFunction, Request, Response } from "express";
import { Controller } from "../decorators/controller";
import { Middleware } from "../decorators/middleware";
import BaseController from "./base-controller";
import verifySessionMiddleware from "../../user/api/middlewares/session/verify-session";

@Controller("/migration")
export default class MigrationController extends BaseController {
  @Middleware()
  private async verifySession(req: Request, res: Response, next: NextFunction) {
    verifySessionMiddleware.execute(req, res, next);
  }
}
