import {NextFunction, Request, Response} from "express";
import {Controller} from "../../../../core/api/decorators/controller";
import {Route} from "../../../../core/api/decorators/route";
import {BadRequest, NotFound} from "http-response-client/lib/errors/client";
import Grouping from "../../classes/controllers/grouping-controller";
import CourseController from "../../../course/api/controllers/course-api-controller";

@Controller("/:courseId/groupings")
export default class CourseGroupingController extends CourseController {

    @Route("get", "/")
    private async getAllByCourse(req: Request, res: Response, next: NextFunction) {
        const courseId = parseInt(req.params.courseId);
        if (!courseId) throw new BadRequest({msg: "courseId not provided"});
        const response = await Grouping.getByFilter({courseId});
        if (!response || (response && !response.length))
            throw new NotFound({msg: "No grouping found on course"});
        res.json(response).status(200);
    }

    @Route("get", "/:groupingId")
    private async getGroupingsByCourse(req: Request, res: Response) {
        const courseId = parseInt(req.params.courseId);
        const groupingId = parseInt(req.params.groupingId);
        if (!courseId) throw new BadRequest({msg: "courseId not provided"});
        if (!groupingId) throw new BadRequest({msg: "groupingId not provided"});

        const response = await Grouping.getOneByFilter({courseId, id: groupingId});
        if (!response)
            throw new NotFound({msg: "No grouping found on course"});
        res.json(response).status(200);
    }

    @Route("post", "/")
    private async createGrouping(req: Request, res: Response, next: NextFunction) {
        const {idnumber, name} = req.body;
        const courseId = parseInt(req.params.courseId);
        if (!idnumber || !name)
            throw new BadRequest({msg: "Missing parameters"});
        const grouping = {
            courseId,
            idnumber,
            name,
        };
        await Grouping.create(grouping);
        res.send({msg: "Grouping created"}).status(201);
    }
}
