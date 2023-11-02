import ICampus from "../../interfaces/models-interfaces/campus-interfaces"

/**
 * @type UpdateCoursesRequest
 * @description The update courses request
 */
export type UpdateCoursesRequest = {
    campus: ICampus;
    courses: CoursesToUpdate[];
}

/**
 * @type CoursesToUpdate
 * @description The courses to update
 */
export type CoursesToUpdate = {
    newCourse: CampusActionTypes.GetCoursesResponse;
    oldCourse: ICourse;
}