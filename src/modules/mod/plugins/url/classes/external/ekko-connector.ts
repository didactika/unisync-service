import CourseController from "../../../../../course/classes/controllers/course-controller";
import EkkoResourcesJSON from "./../../statics/ekko-resources.json";

export default class EkkoConnector {
    public static async getRequiredResources(courseId: number): Promise<{name: string, url:string}[] | null> {
        const courseFound = (await CourseController.getCourse(courseId));
        if (!courseFound) return null;
        const resources = (EkkoResourcesJSON as any[]).filter((resource) => courseFound.shortname.includes(resource.subjectAbbreviation) && resource.options.isRequired);

        return resources.map((resource) => {
            return {
                name: resource.name,
                url: resource.url
            };
        });

    }
}