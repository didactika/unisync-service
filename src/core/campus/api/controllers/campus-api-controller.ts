import { NextFunction, Response, Request } from "express";
import BaseController from "../../../api/controllers/base-controller";
import { Controller } from "../../../api/decorators/controller";
import { Route } from "../../../api/decorators/route";
import { NotFound, BadRequest, Conflict } from "http-response-client/lib/errors/client";
import Campus from "../../classes/controllers/campus-controller";
import { Middleware } from "../../../api/decorators/middleware";
import verifySessionMiddleware from "../../../user/api/middlewares/session/verify-session";
import isAdminMiddleware from "../../../user/api/middlewares/token/is-admin-middleware";

@Controller("/campus")
class CampusController extends BaseController {
  private _req: e.Request;
  @Middleware()
  private async verifySession(req: Request, res: Response, next: NextFunction) {
    verifySessionMiddleware.execute(req, res, next);
  }

  @Middleware()
  private async isAdmin(req: Request, res: Response, next: NextFunction) {
    isAdminMiddleware.execute(req, res, next);
  }

  @Route("get", "/")
  private async getAll(req: Request, res: Response, next: NextFunction) {
    this._req = req;
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

      if (await Campus.campusExists({url})) throw new Conflict({ msg: "Campus already exists" });
      const campusCreated = await Campus.validateAndCreate({ url, token });
      if (!campusCreated) throw new BadRequest({ msg: "Campus cannot be created" });
      res.json(campusCreated).status(201);
    } catch (error) {
      next(error);
    }
  }
}

export default CampusController;
