import { CourseStatus } from "../../types/models-classes-types/courses-class-types";
import ICampus from "./campus-interfaces";

/**
 * Course model interface
 * @interface ICourse
 * @description This interface is used to define the Course
 */
export default interface ICourse {
    id?: string;
    idOnCampus?: number;
    uuid?: string;
    campus: ICampus;
    fullname: string;
    shortname: string;
    status: CourseStatus;
    createdAt?: Date;
}