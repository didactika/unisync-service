import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/controller";
import { Route } from "../decorators/route";
import BaseController from "./base-controller";
import { Middleware } from "../decorators/middleware";
import verifySessionMiddleware from "../../user/api/middlewares/session/verify-session";
import isAdminMiddleware from "../../user/api/middlewares/token/is-admin-middleware";
import Category from "../../classes/controllers/category-controller";
import { BadRequest, NotFound } from "http-response-client/lib/errors/client";

@Controller("/category")
export default class CategoryController extends BaseController {
  @Middleware()
  private verifySession(req: Request, res: Response, next: NextFunction) {
    verifySessionMiddleware.execute(req, res, next);
  }

  @Middleware()
  private isAdmin(req: Request, res: Response, next: NextFunction) {
    isAdminMiddleware.execute(req, res, next);
  }

  @Route("get", "/")
  private async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await Category.getAllCategories();
      if (!response || (response && !response.length))
        throw new NotFound({ msg: "No categories found on campus" });
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  @Route("get", "/:campusId")
  private async getCategoriesFromCampus(req: Request, res: Response, next: NextFunction) {
    try {
      const campusId = parseInt(req.params.campusId);
      if (!campusId) throw new BadRequest({ msg: "CampusId not provided!" });
      const response = await Category.getCategoriesFromCampus(campusId);
      if (!response || (response && !response.length))
        throw new NotFound({ msg: "No categories found on campus" });
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
