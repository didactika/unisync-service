import { NextFunction, Request, Response } from "express";
import MigrationController from "../../../../core/api/controllers/migration-controller";
import { Route } from "../../../../core/api/decorators/route";
import { Controller } from "../../../../core/api/decorators/controller";

@Controller("/course")
export default class CourseMigrationController extends MigrationController {
  
    @Route("post", "/")
    private async createRequest(req: Request, res: Response, next: NextFunction) {
        
    }
}