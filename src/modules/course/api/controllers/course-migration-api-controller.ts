import {Request, Response} from "express";
import Migration from "../../../../core/classes/controllers/migration-controller";
import {Route} from "../../../../core/api/decorators/route";
import {Controller} from "../../../../core/api/decorators/controller";
import {BadRequest, NotFound} from "http-response-client/lib/errors/client";
import CourseMigrationController from "../../classes/controllers/course-migration-controller";
import CourseCampusController from "../../classes/controllers/course-campus-controller";
import CampusController from "../../../../core/campus/classes/controllers/campus-controller";
import Course from "../../classes/controllers/course-controller";
import MigrationController from "../../../../core/api/controllers/migration-controller";

@Controller("/")
export default class CourseMigrationApiController extends MigrationController {
    @Route("post", "/course")
    private async createRequest(req: Request, res: Response) {
        const {courseOriginId, courseTargetId, courseTemplateId, campusOriginId, campusTargetId} = req.body;
        if (!courseOriginId || !campusOriginId || !campusTargetId)
            throw new BadRequest({msg: "Missing required fields"});
        if (!(await CampusController.campusExists({id: campusTargetId})))
            throw new BadRequest({msg: "Campus Target not found"});
        if (!(await CourseCampusController.courseCampusExists(courseOriginId, campusOriginId)))
            throw new BadRequest({msg: "Course Origin not found in campus"});
        const newCourseMigration = await CourseMigrationController.create({
            courseOriginId,
            courseTargetId,
            courseTemplateId,
            campusOriginId,
            campusTargetId,
        });
        res.status(201).json(newCourseMigration);
    }

    //TODO: REVIEW THIS METHOD
    @Route("post", "/:migrationId/finish")
    private async finishMigration(req: Request, res: Response) {
        const migrationId = parseInt(req.params.migrationId);

        if (!migrationId) throw new BadRequest({msg: "Missing required fields"});
        await CourseMigrationController.finishMigration(migrationId);
        res.status(200).json("The migration has been sent to the queue for processing");
    }

    @Route("put", "/:migrationId/course")
    private async getCourse(req: Request, res: Response) {
        const migrationId = parseInt(req.params.migrationId);
        const {idnumber, shortname, fullname, categoryId} = req.body;

        if (!migrationId) throw new BadRequest({msg: "Missing required fields"});
        if (!idnumber && !shortname && !fullname && !categoryId) throw new BadRequest({msg: "Should provide at least one field to update"});

        const migrationFound = await Migration.getOne({id: migrationId});
        if (!migrationFound || !migrationFound.courseId) throw new NotFound({msg: "Migration not found"});

        const courseToUpdate = await Course.getCourse(migrationFound.courseId);
        if (!courseToUpdate) throw new NotFound({msg: "The course to update was not found"});
        const course = await Course.update(courseToUpdate, {idnumber, shortname, fullname});
        if (categoryId) {
            const courseCampusFound = await CourseCampusController.getOneByFilter({course: {id: course.id}});
            if (!courseCampusFound || !courseCampusFound.campusId) throw new NotFound({msg: "Course Campus not found"});
            await CourseCampusController.update(courseCampusFound, {categoryId});
        }
        res.json({course: {...course, categoryId}}).status(200);
    }
}
