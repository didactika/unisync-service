
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
     * @type GetCourseSchemaResponse
     * @description The get course schema response
     */
    type GetCourseSchemaResponse = {
        course_schema: string;
    }

    /**
     * @type GetCourseSchemaObject
     * @description The get course schema object
     */
    type GetCourseSchemaObject = {
        
    }
}