import {
    ICourseMigrationInformation
} from "../../../modules/course/types/classes/entities/course-migration-information-types";
import CourseMigrationInformation from "../../../modules/course/classes/entities/course-migration-information";

export default class MigrationController {
    public static async getOne(filter: Partial<ICourseMigrationInformation>): Promise<ICourseMigrationInformation | null> {
        return await CourseMigrationInformation.findOne<ICourseMigrationInformation>(filter);
    }
}
