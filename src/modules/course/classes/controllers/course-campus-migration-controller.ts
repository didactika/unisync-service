import CourseMigrationController from "./course-migration-controller";
import CourseCampusController from "./course-campus-controller";

export default class CourseCampusMigrationController {
    public static async create(courseId: number): Promise<void> {
        const migrationCourse = await CourseMigrationController.getMigrationCourse(courseId);
        if (!migrationCourse) throw new Error("Migration course not found");

        //TODO: add logic template course
        const newCourseCampus = await CourseCampusController.getOneByFilter({course: {id: migrationCourse.courseOriginId}});
        if (!newCourseCampus) throw new Error("Migration course not found");

        await CourseCampusController.create({
            ...newCourseCampus,
            courseId,
        });
    }


}
