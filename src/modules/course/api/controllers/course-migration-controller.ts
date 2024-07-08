import { NextFunction, Request, Response } from "express";
import MigrationController from "../../../../core/api/controllers/migration-controller";
import { Route } from "../../../../core/api/decorators/route";
import { Controller } from "../../../../core/api/decorators/controller";
import { Middleware } from "../../../../core/api/decorators/middleware";
import verifySessionMiddleware from "../../../../core/user/api/middlewares/session/verify-session";

@Controller("/course")
export default class CourseMigrationController extends MigrationController {
    @Middleware()
    private verifySession(req: Request, res: Response, next: NextFunction) {
      verifySessionMiddleware.execute(req, res, next);
    }
  
    @Route("post", "/")
    private async get(req: Request, res: Response, next: NextFunction) {
        
    }
}