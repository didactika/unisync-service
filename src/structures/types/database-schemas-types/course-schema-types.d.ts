import { Types } from "mongoose";
import ICourse from "../../interfaces/models-interfaces/course-interfaces";

/**
 * @interface IMCourse
 * @description Mongoose Cammpus Interface
 */
export interface IMCourse extends Omit<ICourse, "id" & "campus"> {
    _id: Types.ObjectId;
    campus: Types.ObjectId;
}