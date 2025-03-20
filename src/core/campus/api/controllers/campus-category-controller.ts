import {NextFunction, Request, Response} from "express";
import {Controller} from "../../../api/decorators/controller";
import {Route} from "../../../api/decorators/route";
import {BadRequest, NotFound} from "http-response-client/lib/errors/client";
import CampusController from "./campus-api-controller";
import CampusCategory from "../../classes/controllers/campus-category-controller";

@Controller("/:campusId/category")
export default class CampusCategoryController extends CampusController {
    @Route("get", "/")
    private async getFromCampus(req: Request, res: Response, next: NextFunction) {
        const campusId = parseInt(req.params.campusId);
        if (!campusId) throw new BadRequest({msg: "CampusId not provided!"});
        const response = await CampusCategory.getFromCampus(campusId);
        if (!response || (response && !response.length))
            throw new NotFound({msg: "No categories found on campus"});
        res.json(response);
    }
}