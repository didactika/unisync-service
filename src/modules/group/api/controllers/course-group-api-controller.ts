import {NextFunction, Request, Response} from "express";
import {Controller} from "../../../../core/api/decorators/controller";
import {Route} from "../../../../core/api/decorators/route";
import {BadRequest, NotFound} from "http-response-client/lib/errors/client";
import Group from "../../classes/controllers/group-controller";
import CourseController from "../../../course/api/controllers/course-api-controller";

@Controller("/:courseId/groups")
export default class CourseGroupController extends CourseController {

    @Route("get", "/")
    private async getAllByCourse(req: Request, res: Response, next: NextFunction) {
        const courseId = parseInt(req.params.courseId);
        if (!courseId) throw new BadRequest({msg: "courseId not provided"});
        const response = await Group.getByFilter({courseId});
        if (!response || (response && !response.length))
            throw new NotFound({msg: "No group found on course"});
        res.json(response).status(200);
    }

    @Route("get", "/:groupId")
    private async getGroupsByCourse(req: Request, res: Response) {
        const courseId = parseInt(req.params.courseId);
        const groupId = parseInt(req.params.groupId);
        if (!courseId) throw new BadRequest({msg: "courseId not provided"});
        if (!groupId) throw new BadRequest({msg: "groupId not provided"});

        const response = await Group.getOneByFilter({courseId, id: groupId});
        if (!response)
            throw new NotFound({msg: "No group found on course"});
        res.json(response).status(200);
    }

    @Route("post", "/")
    private async createGroup(req: Request, res: Response, next: NextFunction) {
        const {idnumber, name, description} = req.body;
        const courseId = parseInt(req.params.courseId);
        if (!idnumber || !name)
            throw new BadRequest({msg: "Missing parameters"});
        const group = {
            courseId,
            idnumber,
            name,
            description,
        };
        await Group.create(group);
        res.send({msg: "Group created"}).status(201);
    }
}
