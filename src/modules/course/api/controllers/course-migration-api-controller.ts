import { NextFunction, Request, Response } from "express";
import MigrationController from "../../../../core/api/controllers/migration-controller";
import { Route } from "../../../../core/api/decorators/route";
import { Controller } from "../../../../core/api/decorators/controller";
import { BadRequest } from "http-response-client/lib/errors/client";
import CourseMigrationController from "../../classes/controllers/course-migration-controller";
import CourseCampusController from "../../classes/controllers/course-campus-controller";
import CampusController from "../../../../core/campus/classes/controllers/campus-controller";

@Controller("/course")
export default class CourseMigrationApiController extends MigrationController {
  @Route("post", "/")
  private async createRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseOriginId, courseTargetId, courseTemplateId, campusOriginId, campusTargetId } = req.body;
      if (!courseOriginId || !campusOriginId || !campusTargetId)
        throw new BadRequest({ msg: "Missing required fields" });
      if (!await CampusController.campusExists({id: campusTargetId})) throw new BadRequest({ msg: "Campus Target not found" });
      if (!await CourseCampusController.courseCampusExists(courseOriginId, campusOriginId))
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
}
