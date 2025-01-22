import { NextFunction, Request, Response } from "express";
import MigrationController from "../../../../core/api/controllers/migration-controller";
import { Route } from "../../../../core/api/decorators/route";
import { Controller } from "../../../../core/api/decorators/controller";
import { BadRequest } from "http-response-client/lib/errors/client";
import CourseMigrationController from "../../classes/controllers/course-migration-controller";
import CourseCampusController from "../../classes/controllers/course-campus-controller";
import CampusController from "../../../../core/campus/classes/controllers/campus-controller";
import { Middleware } from "../../../../core/api/decorators/middleware";
import verifySessionMiddleware from "../../../../core/user/api/middlewares/session/verify-session";

@Controller("/")
export default class CourseMigrationApiController extends MigrationController {
  @Middleware()
  private async verifySession(req: Request, res: Response, next: NextFunction) {
    verifySessionMiddleware.execute(req, res, next);
  }
  @Route("post", "/course")
  private async createRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseOriginId, courseTargetId, courseTemplateId, campusOriginId, campusTargetId } = req.body;
      if (!courseOriginId || !campusOriginId || !campusTargetId)
        throw new BadRequest({ msg: "Missing required fields" });
      if (!(await CampusController.campusExists({ id: campusTargetId })))
        throw new BadRequest({ msg: "Campus Target not found" });
      if (!(await CourseCampusController.courseCampusExists(courseOriginId, campusOriginId)))
        throw new BadRequest({ msg: "Course Origin not found in campus" });
      const newCourseMigration = await CourseMigrationController.createMigrationInformation({
        courseOriginId,
        courseTargetId,
        courseTemplateId,
        campusOriginId,
        campusTargetId,
      });
      res.status(201).json(newCourseMigration);
    } catch (error) {
      next(error);
    }
  }

  @Route("post", "/:migrationId/course/finish")
  private async finishMigration(req: Request, res: Response, next: NextFunction) {
    try {
      const migrationId = parseInt(req.params.migrationId);

      if (!migrationId) throw new BadRequest({ msg: "Missing required fields" });
      await CourseMigrationController.finishMigration(migrationId);
      res.status(200).json("The migration has been sent to the queue for processing");
    } catch (error) {
      next(error);
    }
  }
}
