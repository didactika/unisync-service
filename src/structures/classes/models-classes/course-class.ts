import models from "../../../database/models/models";
import ICampus from "../../interfaces/models-interfaces/campus-interfaces";
import ICourse from "../../interfaces/models-interfaces/course-interfaces";
import { CourseFilter, CourseFormatedResponse, CourseStatus } from "../../types/models-classes-types/courses-class-types";

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
        this.id = course.id;
        this.idOnCampus = course.idOnCampus;
        this.uuid = course.uuid;
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
            idOnCampus: this.idOnCampus,
            campus: this.campus,
            fullname: this.fullname,
            shortname: this.shortname,
            status: this.status
        });
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
}