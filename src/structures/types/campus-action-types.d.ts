import { CourseSkeletonTypes } from "./moodle-types/course-skeleton-types";

/**
 * @namespace CampusActionTypes
 * @description The campus action types
 */
export namespace CampusActionTypes {

    /**
     * @type GetCoursesResponse
     * @description The get courses response
     */
    type GetCoursesResponse = {
        id: number;
        fullname: string;
        shortname: string;
        visible: nummber;
        categoryid: number;
    }

    /**
     * @type GetCourseSchemaObject
     * @description The get course schema object
     */
    type GetCourseSchemaObject = CourseSkeletonTypes.CourseSkeleton;
}