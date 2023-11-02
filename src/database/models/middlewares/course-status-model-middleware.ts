import { Schema } from "mongoose";
import { ECourseLanguage, ECourseMigrationStatus } from "../../../structures/types/models-classes-types/courses-class-types";
import httpClient from 'http-response-client';

/**
 * @class CourseModelMiddleware
 */
export default class CourseStatusModelMiddleware {

    /**
     * Apply all middlewares
     * @param {Schema} schema
     * @memberof CourseModelMiddleware
     */
    public static applyAll(schema: Schema): void {
        CourseStatusModelMiddleware.validateData(schema);
    }

    /**
     * Validate the course status
     * @param {Schema} schema
     * @memberof CourseModelMiddleware
     */
    static validateData(schema: Schema) {
        schema.pre('validate', function (next) {
            const keys = Object.keys(this.toObject());
            const validKeys = Object.keys(ECourseLanguage);
            const validValues = Object.values(ECourseMigrationStatus);

            for (let key of keys) {
                if (!validKeys.includes(key))
                    next(new httpClient.errors.BadRequest({ msg: `Invalid key: ${key}. Key must be one of: ${validKeys.join(', ')}` }));
                if (!validValues.includes(this[key]))
                    next(new httpClient.errors.BadRequest({ msg: `Invalid value for key ${key}: ${this[key]}. Value must be one of ${validValues.join(', ')}` }));
            }
            next();
        });
    }

}