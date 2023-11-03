import { Types } from "mongoose";
import models from "../../../database/models/models";
import ICampus from "../../interfaces/models-interfaces/campus-interfaces";
import ICourse from "../../interfaces/models-interfaces/course-interfaces";
import { CampusActionTypes } from "../../types/campus-action-types";
import { v4 as uuidv4 } from 'uuid';
import { CourseFilter, CourseFormatedResponse, CourseStatus, ECourseLanguage, ECourseMigrationStatus } from "../../types/models-classes-types/courses-class-types";

/**
 * @class Course
 * @implements {ICourse}
 */
export default class Course implements ICourse {
    public readonly id?: string;
    public readonly idOnCampus?: number;
    public readonly uuid?: string;
    public readonly campus: ICampus;
    private _fullname: string;
    private _shortname: string;
    private _status: CourseStatus;
    public readonly createdAt?: Date;

    /**
     * Define the course class
     * @constructor
     * @param {ICourse} course course data
     */
    constructor(course: ICourse) {
        this.id = course.id || new Types.ObjectId().toString();
        this.idOnCampus = course.idOnCampus;
        this.uuid = course.uuid || uuidv4();
        this.campus = course.campus;
        this._fullname = course.fullname;
        this._shortname = course.shortname;
        this._status = course.status;
        this.createdAt = course.createdAt;
    }

    /**
     * @Getters
     */
    public get fullname(): string {
        return this._fullname;
    }
    public get shortname(): string {
        return this._shortname;
    }
    public get status(): CourseStatus {
        return this._status;
    }

    /**
     * @Setters
     */
    public set fullname(fullname: string) {
        this._fullname = fullname;
    }
    public set shortname(shortname: string) {
        this._shortname = shortname;
    }
    public set status(status: CourseStatus) {
        this._status = status;
    }

    /**
     * @method Create
     * @description Create a new course
     * @memberof Course
     */
    public async Create(): Promise<void> {
        await models.course.create({
            _id: this.id,
            uuid: this.uuid,
            idOnCampus: this.idOnCampus,
            campus: this.campus,
            fullname: this.fullname,
            shortname: this.shortname,
            status: this.status
        });
    }
    /**
     * @method CreateMany
     * @description Create many courses
     * @memberof Course
     */
    public static async CreateMany(courses: Course[]): Promise<void> {
        await models.course.insertMany(courses.map(course => ({
            _id: course.id,
            uuid: course.uuid,
            idOnCampus: course.idOnCampus,
            campus: course.campus.id,
            fullname: course.fullname,
            shortname: course.shortname,
            status: course.status
        })));
    }

    /**
   * @method GetFormatReadResponse
   * @description Format the response of the read methods
   * @param {course} course course to be formatted
   * @returns {CourseFormatedResponse} Formatted Course
   * @memberof Course
   */
    private static GetFormatReadResponse(course: ICourse): CourseFormatedResponse {
        return {
            id: course.id,
            idOnCampus: course.idOnCampus,
            uuid: course.uuid,
            campus: course.campus,
            fullname: course.fullname,
            shortname: course.shortname,
            status: course.status,
            createdAt: course.createdAt
        }
    }

    /**
   * @method ReadOneByFilter
   * @description Read one course by filter
   * @param {CourseFilter} filter Filter to be used
   * @returns {CourseFormatedResponse | null} course found
   * @memberof Course
   */
    public static async ReadOneByFilter(
        filter: CourseFilter
    ): Promise<CourseFormatedResponse | null> {
        const courseFound = await models.course.findOne(filter) as ICourse;
        return courseFound
            ? this.GetFormatReadResponse(courseFound)
            : null;
    }

    /**
     * @method ReadByFilter
     * @description Read some courses by filter
     * @param {CourseFilter} filter Filter to be used
     * @returns {CourseFormatedResponse} Courses found
     * @memberof Course
     */
    public static async ReadByFilter(filter: CourseFilter): Promise<CourseFormatedResponse[]> {
        const coursesFound = await models.course.find(filter) as ICourse[];
        return coursesFound.map(course => this.GetFormatReadResponse(course));
    }

    /**
     * @method ReadAll
     * @description Read all courses
     * @returns {CourseFormatedResponse} Courses found
     * @memberof Course
     */
    public static async ReadAll(): Promise<CourseFormatedResponse[]> {
        const coursesFound = await models.course.find() as ICourse[];
        return coursesFound.map(course => this.GetFormatReadResponse(course));
    }

    /**
     * @method isDataChanged
     * @description Check if the data is changed
     * @param {Omit<ICourse, "campus" | "status">} newCourse new course data
     * @param {ICourse} oldCourse old course data
     * @returns {boolean} true if the data is changed
     * @memberof Course
     */
    public static isDataChanged(newCourse: CampusActionTypes.GetCoursesResponse, oldCourse: ICourse): boolean {
        return newCourse.fullname !== oldCourse.fullname
            || newCourse.shortname !== oldCourse.shortname;
    }

    /**
     * @method UpdateMany
     * @description Update many courses
     * @param {ICourse[]} courses courses to be updated
     * @returns {void}
     * @memberof Course
     */
    public static async UpdateMany(courses: Course[]): Promise<void> {
        const updates = courses.map(course => ({
            updateOne: {
                filter: { idOnCampus: course.idOnCampus },
                update: {
                    $set: {
                        fullname: course.fullname,
                        shortname: course.shortname,
                        status: course.status
                    }
                }
            }
        }));
    
        await models.course.bulkWrite(updates);
    }

    /**
     * @method GetCourseStatusDefault
     * @description Get the course status default
     * @returns {CourseStatus} the course status default
     * @memberof Course
     */
    public static GetCourseStatusDefault(): CourseStatus {
        return Object.values(ECourseLanguage).reduce((acc, lang) => {
            acc[lang] = ECourseMigrationStatus.PENDING;
            return acc;
        }, {} as CourseStatus);
    }

}