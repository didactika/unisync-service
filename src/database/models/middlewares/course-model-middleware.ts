import { Schema } from "mongoose";
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
     * Apply all middlewares
     * @param {Schema} schema
     * @memberof CourseModelMiddleware
     */
    public static applyAll(schema: Schema<IMCourse>): void {
        CourseModelMiddleware.checkDuplicateCourse(schema);
        CourseModelMiddleware.checkDuplicatedData(schema);
        CourseModelMiddleware.checkRequiredFields(schema);
        CourseModelMiddleware.checkInvalidId(schema);
        CourseModelMiddleware.validateUUID(schema);
    }

    /**
     * Check if the course is duplicated
     * @param {Schema} schema
     * @memberof CourseModelMiddleware
     */
    static async checkDuplicateCourse(schema: Schema): Promise<void> {
        schema.pre('save', async function (next) {
            const duplicateCourse = await models.course.findOne({
                campus: this.campus,
                idOnCampus: this.idOnCampus
            });

            if (duplicateCourse)
                next(new httpClient.errors.Conflict({ msg: `The course with id ${this.idOnCampus} already exists in campus with id ${this.campus}` }));
            next();
        });
    }
}