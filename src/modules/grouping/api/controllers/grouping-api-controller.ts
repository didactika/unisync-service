import { NextFunction, Request, Response } from "express";
import BaseController from "../../../../core/api/controllers/base-controller";
import { Controller } from "../../../../core/api/decorators/controller";
import { Middleware } from "../../../../core/api/decorators/middleware";
import verifySessionMiddleware from "../../../../core/user/api/middlewares/session/verify-session";
import { Route } from "../../../../core/api/decorators/route";
import { BadRequest, NotFound } from "http-response-client/lib/errors/client";
import Grouping from "../../classes/controllers/grouping-controller";
import { IGrouping } from "../../types/classes/entities/grouping-interface";

@Controller("/grouping")
export default class GroupingController extends BaseController {
  @Middleware()
  private async verifySession(req: Request, res: Response, next: NextFunction) {
    verifySessionMiddleware.execute(req, res, next);
  }

  @Route("get", "/:courseId")
  private async getGroupingByCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const courseId = parseInt(req.params.courseId);
      if (!courseId) throw new BadRequest({ msg: "courseId not provided!" });
      const response = await Grouping.getByCourse(courseId);
      if (!response || (response && !response.length))
        throw new NotFound({ msg: "No groupings found on course" });
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  @Route("post", "/create")
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId, idnumber, name, idOnCampus } = req.body;
      if (!courseId || !idnumber || !name || !idOnCampus)
        throw new BadRequest({ msg: "Missing parameters" });
      const grouping: IGrouping = {
        courseId,
        idnumber,
        name,
        idOnCampus,
      };
      await Grouping.create(parseInt(courseId), grouping);
      res.send({ msg: "Grouping created" }).status(201);
    } catch (error) {
      next(error);
    }
  }
}
