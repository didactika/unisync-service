import { NextFunction, Request, Response } from "express";
import BaseController from "../../../../core/api/controllers/base-controller";
import { Controller } from "../../../../core/api/decorators/controller";
import { Middleware } from "../../../../core/api/decorators/middleware";
import verifySessionMiddleware from "../../../../core/user/api/middlewares/session/verify-session";
import { Route } from "../../../../core/api/decorators/route";
import Course from "../../classes/controllers/course-controller";
import { NotAcceptable, NotFound } from "http-response-client/lib/errors/client";
import { ECourseType } from "../../enums/course-type-enum";

//TODO: Add route dinamically with component type from decorator
@Controller("/courses")
export default class CourseController extends BaseController {
  @Middleware()
  private async verifySession(req: Request, res: Response, next: NextFunction) {
    verifySessionMiddleware.execute(req, res, next);
  }

  @Route("get", "/")
  private async getCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const type = req.query.type as ECourseType;
      if (!Object.values(ECourseType).includes(type)) throw new NotAcceptable({ msg: "Type not acceptable" });
      const courses = await Course.getCourses(type);
      if (!courses) throw new NotFound({ msg: "Not found courses" });
      res.json(courses).status(200);
    } catch (error) {
      next(error);
    }
  }

  @Route("get", "/:courseId")
  private async getCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const courseId = parseInt(req.params.courseId);
      const course = await Course.getCourse(courseId);
      if (!course) throw new NotFound({ msg: `Not found course with id ${courseId}` });
      res.json(course).status(200);
    } catch (error) {
      next(error);
    }
  }
}
