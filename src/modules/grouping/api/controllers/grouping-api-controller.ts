import {NextFunction, Request, Response} from "express";
import BaseController from "../../../../core/api/controllers/base-controller";
import {Controller} from "../../../../core/api/decorators/controller";
import {Middleware} from "../../../../core/api/decorators/middleware";
import verifySessionMiddleware from "../../../../core/user/api/middlewares/session/verify-session";
import {Route} from "../../../../core/api/decorators/route";
import {BadRequest, NotFound} from "http-response-client/lib/errors/client";
import Grouping from "../../classes/controllers/grouping-controller";

@Controller("/groups")
export default class GroupController extends BaseController {
    @Middleware()
    private async verifySession(req: Request, res: Response, next: NextFunction) {
        verifySessionMiddleware.execute(req, res, next);
    }

    @Route("get", "/")
    private async getAll(req: Request, res: Response, next: NextFunction) {
        const response = await Grouping.getAll();
        if (!response || (response && !response.length))
            throw new NotFound({msg: "No groupings found"});
        res.json(response).status(200);
    }

    @Route("get", "/:groupingId")
    private async getGroupsByCourse(req: Request, res: Response) {
        const groupingId = parseInt(req.params.groupingId);
        if (!groupingId) throw new BadRequest({msg: "groupingId not provided"});
        const response = await Grouping.getOneByFilter({id: groupingId});
        if (!response)
            throw new NotFound({msg: "No group found"});
        res.json(response).status(200);
    }

    @Route("post", "/")
    private async createGroup(req: Request, res: Response, next: NextFunction) {
        const {courseId, idnumber, name} = req.body;
        if (!courseId || !idnumber || !name)
            throw new BadRequest({msg: "Missing parameters"});
        const grouping = {
            courseId,
            idnumber,
            name,
        };
        await Grouping.create(grouping);
        res.send({msg: "Group created"}).status(201);
    }
}
