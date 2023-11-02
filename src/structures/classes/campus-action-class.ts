import ICampusAction from "../interfaces/campus-action-interfaces";
import { moodleClient } from "moodle-web-service-client";
import { CampusActionTypes } from "../types/campus-action-types";

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
     * @memberof CampusAction
     */
    public async GetCourses(isActive: boolean = true): Promise<CampusActionTypes.GetCoursesResponse[]> {
        const data = (await moodleClient({
            urlRequest: {
                rootURL: this.url,
                token: this.token,
                webServiceFunction: "core_course_get_courses",
            },
            content: {}
        })).data as CampusActionTypes.GetCoursesResponse[];
        return data.filter(course => course.visible === isActive);
    }
}