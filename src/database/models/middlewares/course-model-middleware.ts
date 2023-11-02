import { IMCourse } from "../../../structures/types/database-schemas-types/course-schema-types";
import { ECourseLanguage, ECourseMigrationStatus } from "../../../structures/types/models-classes-types/courses-class-types";
import models from "../models";
import ModelMiddleware from "./model-middleware";
import httpClient from 'http-response-client';

/**
 * @class CourseModelMiddleware
 */
export default class CourseModelMiddleware extends ModelMiddleware {
    /**
     * Check if the course is duplicated
     * @param {IMCourse} this
     * @param {(error?: Error) => void} next
     * @memberof CourseModelMiddleware
     */
    static async checkDuplicateCourse(this: IMCourse, next: (error?: Error) => void): Promise<void> {
        const duplicateCourse = await models.course.findOne({
            campus: this.campus,
            idOnCampus: this.idOnCampus
        });

        if (duplicateCourse)
            throw new httpClient.errors.Conflict({ msg: `The course with id ${this.idOnCampus} already exists in campus with id ${this.campus}` });
        next();
    }

    /**
     * Validate the course status
     * @param {IMCourse} this
     * @param {() => void} next
     * @memberof CourseModelMiddleware
     */
    static validateCourseStatus(this: any, next: () => void) {
        const keys = Object.keys(this.toObject());
        const validKeys = Object.keys(ECourseLanguage);
        const validValues = Object.values(ECourseMigrationStatus);

        for (let key of keys) {
            if (!validKeys.includes(key))
                throw new httpClient.errors.BadRequest({ msg: `Invalid key: ${key}. Key must be one of: ${validKeys.join(', ')}` });
            if (!validValues.includes(this[key]))
                throw new httpClient.errors.BadRequest({ msg: `Invalid value for key ${key}: ${this[key]}. Value must be one of ${validValues.join(', ')}` });
        }
        next();
    }
}