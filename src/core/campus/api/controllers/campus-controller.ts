import { NextFunction, Response, Request } from "express";
import BaseController from "../../../api/controllers/base-controller";
import { Controller } from "../../../api/decorators/controller";
import { Route } from "../../../api/decorators/route";
import Campus from "../../classes/entities/campus";
import { ICampus } from "../../types/classes/entities/campus-interface";
import { NotFound } from "http-response-client/lib/errors/client";

@Controller("/campus")
class CampusController extends BaseController {
  @Route("get", "/")
  private async getAllCampus(req: Request, res: Response, next: NextFunction) {
    try {
      const campus = (await Campus.findMany<ICampus>()).map((campus) => {
        uuid: campus.uuid;
        name: campus.name;
        url: campus.url;
        token: campus.token;
        version: campus.version;
      });
      if (!campus.length) {
        throw new NotFound({ msg: "No campus found" });
      }
      res.json(campus).status(200);
    } catch (error) {
      next(error);
    }
  }
}

export default CampusController;
