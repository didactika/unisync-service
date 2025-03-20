import {NextFunction, Request, Response} from "express";
import {Controller} from "../decorators/controller";
import {Route} from "../decorators/route";
import BaseController from "./base-controller";
import {Middleware} from "../decorators/middleware";
import verifySessionMiddleware from "../../user/api/middlewares/session/verify-session";
import Category from "../../classes/controllers/category-controller";
import {NotFound} from "http-response-client/lib/errors/client";

@Controller("/category")
export default class CategoryController extends BaseController {
    @Middleware()
    private verifySession(req: Request, res: Response, next: NextFunction) {
        verifySessionMiddleware.execute(req, res, next);
    }

    @Route("get", "/")
    private async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const categoriesFound = await Category.getAll();
            if (!categoriesFound.length) throw new NotFound({msg: "No categories found"});
            res.json(categoriesFound);
        } catch (error) {
            next(error);
        }
    }

    @Route("get", "/:categoryId")
    private async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId = parseInt(req.params.categoryId);
            const categoryFound = await Category.getOne({id: categoryId});
            if (!categoryFound) throw new NotFound({msg: "Category not found"});
            res.json(categoryFound);
        } catch (error) {
            next(error);
        }
    }
}
