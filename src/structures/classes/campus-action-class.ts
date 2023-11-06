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
     * @method GetCourseByShortname
     * @description Get courses from one campus by shortname
     * @param {string} shortname course shortname
     */
    public async GetCourseByShortname(shortname:string): Promise<CampusActionTypes.GetCoursesResponse> {
        const data = (await moodleClient({
            urlRequest: {
                rootURL: this.url,
                token: this.token,
                webServiceFunction: "core_course_get_courses_by_field",
            },
            content: {
                field: "shortname",
                value: shortname
            }
        })).data.courses as CampusActionTypes.GetCoursesResponse[];
        return data[0];
    }

    /**
     * @method GetCourseSchema
     * @description Get the course schema
     * @param {number} courseid course id
     * @memberof CampusAction
     */
    public async GetCourseSchema(courseid: number): Promise<CampusActionTypes.GetCourseSchemaObject> {
        const data = (await moodleClient({
            urlRequest: {
                rootURL: this.url,
                token: this.token,
                webServiceFunction: "local_unisync_course_json_get",
            },
            content: {
                courseid,
            }
        })).data as CampusActionTypes.GetCourseSchemaResponse;
        const json = data.course_schema;
        return  JSON.parse(Parser.ParseUnicodeCharacters(json));
    }

    /**
     * @method CreateCourseBySchema
     * @description Create a course by schema
     * @param {CampusActionTypes.GetCourseSchemaObject} jsonSchema course schema
     * @memberof CampusAction
     * @returns {Promise<boolean>} true if course was created
     */
    public CreateCourseBySchema(jsonSchema: CampusActionTypes.GetCourseSchemaObject): boolean {
        try {
            moodleClient({
                urlRequest: {
                    rootURL: this.url,
                    token: this.token,
                    webServiceFunction: "local_unisync_course_create",
                },
                content: {
                    course_schema: JSON.stringify(jsonSchema),
                }
            });
            return true;
        } catch (error) {
            throw error;
        }
        
    }


}