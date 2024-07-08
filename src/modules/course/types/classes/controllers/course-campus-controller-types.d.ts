import { ICampus } from "../../../../../core/campus/types/classes/entities/campus-interface";
import { ICourse } from "../entities/course-types";

export type GetCoursesByCampusResponse = {
    campus: ICampus;
    courses: ICourse[];
};