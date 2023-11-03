
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
     * @type GetCourseJSONSchemaResponse
     * @description The get course json schema response
     */
    type GetCourseJSONSchemaResponse = {
        course_schema: string;
    }

}