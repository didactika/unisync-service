
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

}