import { NextFunction, Request, Response } from "express-serve-static-core";
import httpClient from "http-response-client"
import Campus from "../../structures/classes/models-classes/campus-class";
import models from "../../database/models/models";
import Course from "../../structures/classes/models-classes/course-class";
import { CourseStatus, ECourseLanguage, ECourseMigrationStatus } from "../../structures/types/models-classes-types/courses-class-types";

export default class TempCourseController {
    public static async readOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { campusUuid, shortname } = req.params;
            const lang = req.query.lang as ECourseLanguage;

            if (!campusUuid || !campusUuid.trim())
                throw new httpClient.errors.BadRequest({ msg: "Invalid campus uuid" });
            if (!shortname || !shortname.trim())
                throw new httpClient.errors.BadRequest({ msg: "Invalid course shortname" });
            if (!lang || !lang.trim())
                throw new httpClient.errors.BadRequest({ msg: "Invalid lang" });

            const campusFound = await Campus.ReadOneByFilter({ uuid: campusUuid });
            if (!campusFound)
                throw new httpClient.errors.NotFound({ msg: "Campus not found" });
            const campus = new Campus(campusFound);

            const tempCourse = await models.tempCourse.findOne({
                    newCampus: campus.uuid,
                    language: lang,
                    courseShortname: shortname
            });

            if (!tempCourse) {
                throw new httpClient.errors.NotFound({ msg: "Temp course not found" });
            } else {
                res.status(200).json(tempCourse);
            }
        } catch (error) {
            next(error);
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { campusUuid, shortname } = req.params;
            const lang = req.query.lang as ECourseLanguage;
            const { oldCampusUuid, courseData } = req.body;

            if (!courseData)
                throw new httpClient.errors.BadRequest({ msg: "Invalid course data" });
            if (!campusUuid || !campusUuid.trim())
                throw new httpClient.errors.BadRequest({ msg: "Invalid campus uuid" });
            if (!oldCampusUuid || !oldCampusUuid.trim())
                throw new httpClient.errors.BadRequest({ msg: "Invalid old campus uuid" });
            if (!shortname || !shortname.trim())
                throw new httpClient.errors.BadRequest({ msg: "Invalid course shortname" });
            if (!lang || !lang.trim())
                throw new httpClient.errors.BadRequest({ msg: "Invalid lang" });

            const campusFound = await Campus.ReadOneByFilter({ uuid: campusUuid });
            if (!campusFound)
                throw new httpClient.errors.NotFound({ msg: "Campus not found" });
            const campus = new Campus(campusFound);

            const oldCampusFound = await Campus.ReadOneByFilter({ uuid: oldCampusUuid });
            if (!oldCampusFound)
                throw new httpClient.errors.NotFound({ msg: "Old campus not found" });
            const oldCampus = new Campus(oldCampusFound);
            
            let courseFound = await Course.ReadOneByFilter({ campus: oldCampus.id, shortname });
            if (!courseFound)
                throw new httpClient.errors.NotFound({ msg: "Course not found" });

            const tempCourse = await models.tempCourse.findOne({
                    oldCampus: oldCampus.uuid,
                    newCampus: campus.uuid,
                    language: lang,
                    courseShortname: shortname
            });
            
            if (!tempCourse) {
                await models.tempCourse.create({
                    oldCampus: oldCampus.uuid,
                    newCampus: campus.uuid,
                    courseShortname: shortname,
                    language: lang,
                    courseData
                });
                courseFound.status = Object.values(ECourseLanguage).reduce((acc, language) => {
                    acc[language] = courseFound!.status[language];
                    if (language === lang)
                        acc[language] = ECourseMigrationStatus.INPROGRESS;
                    return acc;
                }, {} as CourseStatus);
                
                await models.course.findByIdAndUpdate(courseFound.id, {status: courseFound.status});
                res.status(200).json({ msg: "Temp course create" });
            } else {
                await models.tempCourse.findOneAndUpdate({
                    oldCampus: oldCampus.uuid,
                    newCampus: campus.uuid,
                    language: lang,
                    courseShortname: shortname
                }, {
                    courseData
                });
                res.status(200).json({ msg: "Temp course updated" });
            }
        } catch (error) {
            next(error);
        }
        }

        public static async save(req: Request, res: Response, next: NextFunction) {
            try {
                const { campusUuid, shortname } = req.params;
                const lang = req.query.lang as ECourseLanguage;
                const { oldCampusUuid } = req.body;
    
                if (!campusUuid || !campusUuid.trim())
                    throw new httpClient.errors.BadRequest({ msg: "Invalid campus uuid" });
                if (!oldCampusUuid || !oldCampusUuid.trim())
                    throw new httpClient.errors.BadRequest({ msg: "Invalid old campus uuid" });
                if (!shortname || !shortname.trim())
                    throw new httpClient.errors.BadRequest({ msg: "Invalid course shortname" });
                if (!lang || !lang.trim())
                    throw new httpClient.errors.BadRequest({ msg: "Invalid lang" });
    
                const campusFound = await Campus.ReadOneByFilter({ uuid: campusUuid });
                if (!campusFound)
                    throw new httpClient.errors.NotFound({ msg: "Campus not found" });
                const campus = new Campus(campusFound);
    
                const oldCampusFound = await Campus.ReadOneByFilter({ uuid: oldCampusUuid });
                if (!oldCampusFound)
                    throw new httpClient.errors.NotFound({ msg: "Old campus not found" });
                const oldCampus = new Campus(oldCampusFound);


                let courseFound = await Course.ReadOneByFilter({ campus: oldCampus.id, shortname });
            if (!courseFound)
                throw new httpClient.errors.NotFound({ msg: "Course not found" });
    
                const tempCourse = await models.tempCourse.findOne({
                        oldCampus: oldCampus.uuid,
                        newCampus: campus.uuid,
                        language: lang,
                        courseShortname: shortname
                }) as any;
    
                if (!tempCourse) {
                    throw new httpClient.errors.NotFound({ msg: "Temp course not found" });
                } 
                campus.actions.CreateCourseBySchema(tempCourse.courseData);
                courseFound.status = Object.values(ECourseLanguage).reduce((acc, language) => {
                    acc[language] = courseFound!.status[language];
                    if (language === lang)
                        acc[language] = ECourseMigrationStatus.COMPLETED;
                    return acc;
                }, {} as CourseStatus);
                
                await models.course.findByIdAndUpdate(courseFound.id, {status: courseFound.status});
                await models.tempCourse.findOneAndDelete({
                    oldCampus: oldCampus.uuid,
                    newCampus: campus.uuid,
                    language: lang,
                    courseShortname: shortname
                });
                res.status(200).json({ msg: "Temp course imported send success" });
                
            } catch (error) {
                next(error);
            }
        }

    public static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { campusUuid, shortname } = req.params;
            const lang = req.query.lang as ECourseLanguage;
            const { oldCampusUuid } = req.body;

            if (!campusUuid || !campusUuid.trim())
                throw new httpClient.errors.BadRequest({ msg: "Invalid campus uuid" });
            if (!oldCampusUuid || !oldCampusUuid.trim())
                throw new httpClient.errors.BadRequest({ msg: "Invalid old campus uuid" });
            if (!shortname || !shortname.trim())
                throw new httpClient.errors.BadRequest({ msg: "Invalid course shortname" });

            const campusFound = await Campus.ReadOneByFilter({ uuid: campusUuid });
            if (!campusFound)
                throw new httpClient.errors.NotFound({ msg: "Campus not found" });
            const campus = new Campus(campusFound);

            const oldCampusFound = await Campus.ReadOneByFilter({ uuid: oldCampusUuid });
            if (!oldCampusFound)
                throw new httpClient.errors.NotFound({ msg: "Old campus not found" });
            const oldCampus = new Campus(oldCampusFound);

            let courseFound = await Course.ReadOneByFilter({ campus: oldCampus.id, shortname });
            if (!courseFound)
                throw new httpClient.errors.NotFound({ msg: "Course not found" });

            const tempCourse = await models.tempCourse.findOne({
                    oldCampus: oldCampus.uuid,
                    newCampus: campus.uuid,
                    language: lang,
                    courseShortname: shortname
            });

            if (!tempCourse) {
                throw new httpClient.errors.NotFound({ msg: "Temp course not found" });
            } else {
                await models.tempCourse.findOneAndDelete({
                    oldCampus: oldCampus.uuid,
                    newCampus: campus.uuid,
                    language: lang,
                    courseShortname: shortname
                });
                courseFound.status = Object.values(ECourseLanguage).reduce((acc, language) => {
                    acc[language] = courseFound!.status[language];
                    if (language === lang)
                        acc[language] = ECourseMigrationStatus.PENDING;
                    return acc;
                }, {} as CourseStatus);
                
                await models.course.findByIdAndUpdate(courseFound.id, {status: courseFound.status});

                res.status(200).json({ msg: "Temp course deleted" });
            }
        } catch (error) {
            next(error);
        }
    }
}