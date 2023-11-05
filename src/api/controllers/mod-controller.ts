import { NextFunction, Request, Response } from "express";
import httpClient from "http-response-client";
import Campus from "../../structures/classes/models-classes/campus-class";
import { CourseSkeletonTypes } from "../../structures/types/moodle-types/course-skeleton-types";

/**
 * @class ModController
 */
export default class ModController {
    /**
     * @description This method is used to read all mods from a course
     * @memberof ModController
     */
    public static async readModsByType(req: Request, res: Response, next: NextFunction) {
        try {
            const { campusUuid, shortname, modType } = req.params;

            if (!campusUuid || !campusUuid.trim())
                throw new httpClient.errors.BadRequest({ msg: "Invalid campus uuid" });
            if (!shortname || !shortname.trim())
                throw new httpClient.errors.BadRequest({ msg: "Invalid course shortname" });

            const campusFound = await Campus.ReadOneByFilter({ uuid: campusUuid });
            if (!campusFound)
                throw new httpClient.errors.NotFound({ msg: "Campus not found" });
            const campus = new Campus(campusFound);

            const courseFound = await campus.actions.GetCourseByShortname(shortname);
            if (!courseFound)
                throw new httpClient.errors.NotFound({ msg: "Course not found" });

            const courseInformation = await campus.actions.GetCourseSchema(courseFound.id);

            if (!courseInformation)
                throw new httpClient.errors.NotFound({ msg: "Course not found" });

            const mods: CourseSkeletonTypes.SectionTypes.Mod[] = [];
            courseInformation.sections.forEach(section => {
                section.mods.forEach(mod => {
                    if (mod.modtype === modType)
                        mods.push(mod);
                });
            });

            res.status(200).json(mods);
        } catch (error) {
            next(error);
        }
    }
}