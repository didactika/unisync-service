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

   @Route("post", "/") 
   private async getAll(req: Request, res: Response, next: NextFunction)  {
       try {
        const { campusId } = req.body;
        if(!campusId || campusId === undefined) throw new BadRequest({ msg: "campusId not provided"});
        const response = await Category.syncCategoriesFromCampus(campusId);
        if(!response || (response && !response.length)) throw new NotFound({ msg: "No categories found on campus" });
        res.json(response);
       } catch(error) {
        next(error);
       }
   }
}