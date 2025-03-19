import {CourseModuleCreationAttributes} from "../../db/models/course-module";

export default interface ICourseModule extends CourseModuleCreationAttributes {
    id?: number;
}