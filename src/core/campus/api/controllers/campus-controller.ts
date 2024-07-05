import { NextFunction, Response, Request } from "express";
import BaseController from "../../../api/controllers/base-controller";
import { Controller } from "../../../api/decorators/controller";
import { Route } from "../../../api/decorators/route";
import { NotFound } from "http-response-client/lib/errors/client";
import Campus from "../../classes/controllers/campus-controller";

@Controller("/campus")
class CampusController extends BaseController {
  @Route("get", "/")
  private async getAllCampus(req: Request, res: Response, next: NextFunction) {
    try {
      const campusFound = await Campus.getAllCampus();
      if (!campusFound.length) throw new NotFound({ msg: "No campus found" });
      res.json(campusFound).status(200);
    } catch (error) {
      next(error);
    }
  }
}

export default CampusController;
