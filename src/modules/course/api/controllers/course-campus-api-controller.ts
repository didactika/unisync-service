import { NextFunction, Request, Response } from "express";
import { Controller } from "../../../../core/api/decorators/controller";
import { Route } from "../../../../core/api/decorators/route";
import CourseCampus from "../../classes/controllers/course-campus-controller";
import { NotFound } from "http-response-client/lib/errors/client";
import CampusController from "../../../../core/campus/api/controllers/campus-api-controller";
import { GetCoursesByCampusResponse } from "../../types/classes/controllers/course-campus-controller-types";

//TODO: Add route dinamically with component type from decorator
@Controller("/")
export default class CourseController extends CampusController {
  @Route("get", "/courses")
  private async getAllCoursesByCampus(req: Request, res: Response, next: NextFunction) {
    try {
      const campusCourses = await CourseCampus.getCoursesByCampus();
      if (!campusCourses) throw new NotFound({ msg: "Not found courses by campus" });
      res.json(campusCourses).status(200);
    } catch (error) {
      next(error);
    }
  }

  @Route("get", "/:campusId/courses")
  private async getCoursesByCampus(req: Request, res: Response, next: NextFunction) {
    try {
      const campusId = parseInt(req.params.campusId);
      const campusCourses = await CourseCampus.getCoursesByCampus(campusId) as GetCoursesByCampusResponse;
      if (!campusCourses || (Array.isArray(campusCourses) && !campusCourses.length))
        throw new NotFound({ msg: "Not found courses by campus" });
      res.json(campusCourses.courses).status(200);
    } catch (error) {
      next(error);
    }
  }
}
