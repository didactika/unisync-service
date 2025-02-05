import { NextFunction, Request, Response } from "express";
import BaseController from "../../../../core/api/controllers/base-controller";
import { Controller } from "../../../../core/api/decorators/controller";
import { Middleware } from "../../../../core/api/decorators/middleware";
import verifySessionMiddleware from "../../../../core/user/api/middlewares/session/verify-session";
import { Route } from "../../../../core/api/decorators/route";
import { BadRequest, NotFound } from "http-response-client/lib/errors/client";
import Group from "../../classes/controllers/group-controller";
import { IGroup } from "../../types/classes/entities/group-interface";

@Controller("/groups")
export default class GroupController extends BaseController {
  @Middleware()
  private async verifySession(req: Request, res: Response, next: NextFunction) {
    verifySessionMiddleware.execute(req, res, next);
  }

  @Route("get", "/")
  private async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await Group.getAllGroups();
      if (!response || (response && !response.length))
        throw new NotFound({ msg: "No groups found" });
      res.json(response).status(200);
    } catch (error) {
      next(error);
    }
  }

  @Route("get", "/:courseId")
  private async getGroupsByCourse(req: Request, res: Response) {
    const courseId = parseInt(req.params.courseId);
    if (!courseId) throw new BadRequest({ msg: "courseId not provided" });
    const response = await Group.getByCourse(courseId);
    if (!response || (response && !response.length))
      throw new NotFound({ msg: "No group found on course" });
    res.json(response).status(200);
  }

  @Route("post", "/create")
  private async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId, idnumber, name, idOnCampus, description } = req.body;
      if (!courseId || !idnumber || !name || !idOnCampus || !description)
        throw new BadRequest({ msg: "Missing parameters" });
      const grouping: IGroup = {
        courseId,
        idnumber,
        name,
        idOnCampus,
        description,
      };
      await Group.create(parseInt(courseId), grouping);
      res.send({ msg: "Group created" }).status(201);
    } catch (error) {
      next(error);
    }
  }
}
