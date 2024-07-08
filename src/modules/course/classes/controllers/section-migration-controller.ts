import { CourseMigrationInformationUpdatedEventData } from "../../types/events/internal/course-migration-information-updated";
import CourseMigrationController from "./course-migration-controller";
import SectionController from "./section-controller";

export default class SectionMigrationController {
  //TODO: Refactor this method
  public static async create(courseId: number): Promise<void> {
    const migrationCourse = await CourseMigrationController.getMigrationCourse(courseId!);
    if (!migrationCourse) {
      throw new Error("Migration course not found");
    }
    //TODO: add logic template course
    const newSections = await SectionController.getSectionsByCourse(migrationCourse.courseOriginId);
    if (!newSections) {
      throw new Error("Sections not found");
    }
    
    for (const section of newSections) {
      await SectionController.create(courseId!, {
        ...section,
        id: undefined,
      });
    }
    return;
  }
}
