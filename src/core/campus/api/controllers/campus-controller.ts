import { NextFunction, Response, Request } from "express";
import BaseController from "../../../api/controllers/base-controller";
import { Controller } from "../../../api/decorators/controller";
import { Route } from "../../../api/decorators/route";
import { NotFound, BadRequest } from "http-response-client/lib/errors/client";
import Campus from "../../classes/controllers/campus-controller";

@Controller("/campus")
class CampusController extends BaseController {
  @Route("get", "/")
  private async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const campusFound = await Campus.getAll();
      if (!campusFound.length) throw new NotFound({ msg: "No campus found" });
      res.json(campusFound).status(200);
    } catch (error) {
      next(error);
    }
  }

  @Route("post", "/")
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { url, token } = req.body;
      if (!url || url.trim() === "" || !token || token.trim() === "")
        throw new BadRequest({ msg: "Url and token are required" });

      const campusCreated = await Campus.validateAndCreate({ url, token });
      res.json(campusCreated).status(201);
    } catch (error) {
      next(error);
    }
  }
}

export default CampusController;
