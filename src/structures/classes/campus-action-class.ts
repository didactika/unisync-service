import ICampusAction from "../interfaces/campus-action-interfaces";
import { moodleClient } from "moodle-web-service-client";
import { CampusActionTypes } from "../types/campus-action-types";
import Parser from "../../utils/parser";

/**
 * @class CampusAction
 */
export default class CampusAction {
    private readonly url: string;
    private readonly token: string;

    /**
     * Define the campus action model
     * @constructor
     * @param {ICampusAction} campus campus data for request a action
     */
    constructor(campus: ICampusAction) {
        this.url = campus.url;
        this.token = campus.token;
    }

    /**
     * @method GetCourses
     * @description Get All courses from one campus
     * @param {boolean} isActive if true get only active courses
     * @param {number} categoryid category id
     * @memberof CampusAction
     */
    public async GetCourses(isActive: boolean = true, categoryid?: number): Promise<CampusActionTypes.GetCoursesResponse[]> {
        const isVisible = isActive ? 1 : 0;
        const data = (await moodleClient({
            urlRequest: {
                rootURL: this.url,
                token: this.token,
                webServiceFunction: "core_course_get_courses",
            },
            content: {}
        })).data as CampusActionTypes.GetCoursesResponse[];
        return data.filter(course => 
            course.visible === isVisible 
            && course.categoryid !== 0
            && (categoryid ? course.categoryid === categoryid : true));
    }

    /**
     * @method GetCourseJSONSchema
     * @description Get the course json schema
     * @param {number} courseid course id
     * @memberof CampusAction
     */
    public async GetCourseJSONSchema(courseid: number): Promise<Object> {
        const data = (await moodleClient({
            urlRequest: {
                rootURL: this.url,
                token: this.token,
                webServiceFunction: "local_unisync_course_json_get",
            },
            content: {
                courseid,
            }
        })).data as CampusActionTypes.GetCourseJSONSchemaResponse;
        const json = data.course_schema;
        return  JSON.parse(Parser.ParseUnicodeCharacters(json));
    }
}