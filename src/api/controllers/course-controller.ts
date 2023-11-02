import { Request, Response } from "express-serve-static-core";
import Campus from "../../structures/classes/models-classes/campus-class";
import httpClient from "http-response-client";
import ICampus from "../../structures/interfaces/models-interfaces/campus-interfaces";
import { NextFunction } from "express";
import Course from "../../structures/classes/models-classes/course-class";
import ICourse from "../../structures/interfaces/models-interfaces/course-interfaces";
import { CourseFormatedResponse, ECourseLanguage, ECourseMigrationStatus } from "../../structures/types/models-classes-types/courses-class-types";
import { CampusActionTypes } from "../../structures/types/campus-action-types";
import { CoursesToUpdate, UpdateCoursesRequest } from "../../structures/types/controller-types/course-controller-types";

/**
 * @class CourseController
 */
export default class CourseController {

    /**
     * @description This method is used to create new courses
     * @param {Campus} campus campus to create courses
     * @param {CampusActionTypes.GetCoursesResponse[]} courses courses to create
     * @memberof CourseController
     */
    private static async createCourses(campus: Campus, courses: CampusActionTypes.GetCoursesResponse[]): Promise<void> {
        const coursesFormated: ICourse[] = courses.map(course => ({
            campus: campus as ICampus,
            fullname: course.fullname,
            shortname: course.shortname,
            status: Course.GetCourseStatusDefault(),
        }));
        await Course.CreateMany(coursesFormated);
    }

    /**
     * @description This method is used to update courses
     * @param {UpdateCoursesRequest} data data to read courses
     * @memberof CourseController
     */
    private static async updateCourses(data: UpdateCoursesRequest): Promise<void> {
        const coursesToUpdate: ICourse[] = data.courses.map(courseToUpdate => {
            return {
                idOnCampus: courseToUpdate.newCourse.id,
                campus: data.campus as ICampus,
                fullname: courseToUpdate.newCourse.fullname,
                shortname: courseToUpdate.newCourse.shortname,
                status: courseToUpdate.oldCourse
                    ? courseToUpdate.oldCourse.status
                    : Course.GetCourseStatusDefault(),
            };
        });
        await Course.UpdateMany(coursesToUpdate);
    }


    /**
     * @description This method is used to read courses from a campus
     * @param {Campus} campus campus to read courses
     * @memberof CourseController
     */
    private static async compareData(campus: Campus): Promise<void> {
        const coursesFromCampus = await campus.actions.GetCourses(),
            coursesFromDatabase = await Course.ReadByFilter({ campus: campus.id }),
            coursesToCreate: CampusActionTypes.GetCoursesResponse[] = [],
            coursesToUpdate: CoursesToUpdate[] = [];

        coursesFromCampus.forEach(courseFromCampus => {
            const courseFromDatabase = coursesFromDatabase.find(course => course.idOnCampus === courseFromCampus.id);
            if (!courseFromDatabase)
                coursesToCreate.push(courseFromCampus);
            else if (Course.isDataChanged(courseFromCampus, courseFromDatabase))
                coursesToUpdate.push({ newCourse: courseFromCampus, oldCourse: courseFromDatabase });
        });
        await this.createCourses(campus, coursesToCreate);
        await this.updateCourses({
            campus,
            courses: coursesToUpdate
        });
    }

    /**
     * Create a new course
     * @memberof CourseController
     */
    public static async readAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { campusUuid } = req.params;
            const lang = req.query.lang as ECourseLanguage || "es";

            if (!campusUuid || !campusUuid.trim())
                throw new httpClient.errors.BadRequest({ msg: "Invalid request body" });

            const campusFound = await Campus.ReadOneByFilter({ uuid: campusUuid });

            if (!campusFound)
                throw new httpClient.errors.NotFound({ msg: "Campus not found" });

            const campus = new Campus(campusFound as ICampus);
            await this.compareData(campus);
            const courses: (
                Omit<CourseFormatedResponse, "status">
                & { status: ECourseMigrationStatus }
            )[] =
                (await Course.ReadByFilter({ campus: campus.id })).map((course) => ({
                    id: course.id,
                    uuid: course.uuid,
                    campus: course.campus,
                    fullname: course.fullname,
                    shortname: course.shortname,
                    status: course.status[lang] || ECourseMigrationStatus.PENDING,
                }));

            res.status(200).json(courses.map(course => ({
                shortname: course.shortname as string,
                fullname: course.fullname as string,
                status: course.status,
            })));
        } catch (error) {
            next(error);
        }
    }
}