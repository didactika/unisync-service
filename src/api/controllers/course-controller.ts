import { Request, Response } from "express-serve-static-core";
import Campus from "../../structures/classes/models-classes/campus-class";
import httpClient from "http-response-client";
import ErrorMiddleware from "../middlewares/error-middleware";
import ICampus from "../../structures/interfaces/models-interfaces/campus-interfaces";

/**
 * @class CourseController
 */
export default class CourseController {

    /**
     * Create a new course
     * @memberof CourseController
     */
    public static async readAll(req: Request, res: Response): Promise<void> {
        try {
            const { campusUuid } = req.body;

            if (!campusUuid || !campusUuid.trim())
                throw new httpClient.errors.BadRequest({ msg: "Invalid request body" });

            const campusFound = await Campus.ReadOneByFilter({ uuid: campusUuid });
            
            if (!campusFound)
                throw new httpClient.errors.NotFound({ msg: "Campus not found" });

            const campus = new Campus(campusFound as ICampus);
            const courses = await campus.actions.GetCourses();

            res.status(200).json(courses.map(course => {
                //mapear el curso, por ahora se envia completo
                return course;
            }));
        } catch (error) {
            ErrorMiddleware.responseError(error as Error, res);
        }
    }
}