import { NextFunction, Request, Response } from "express";
import BaseController from "../../../../core/api/controllers/base-controller";
import { Controller } from "../../../../core/api/decorators/controller";
import { Middleware } from "../../../../core/api/decorators/middleware";
import verifySessionMiddleware from "../../../../core/user/api/middlewares/session/verify-session";

@Controller("/course")
export default class CourseController extends BaseController {
    @Middleware()
    private verifySession(req: Request, res: Response, next: NextFunction) {
      verifySessionMiddleware.execute(req, res, next);
    }

    
}