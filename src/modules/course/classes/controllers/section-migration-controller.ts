import RabbitMQPublisher from "../../../../core/events/message-broker/classes/rabbitmq/publisher/publisher";
import { CourseMigrationInformationUpdatedEventData } from "../../types/events/internal/course-migration-information-updated";
import { CourseSectionCreatedEvent } from "../../types/events/message-broker/course-section-created";
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

  public static async finishMigration(courseId: number): Promise<void> {
    const migrationCourse = await CourseMigrationController.getMigrationCourse(courseId!);
    if (!migrationCourse) {
      throw new Error("Migration course not found");
    }
    const sections = await SectionController.getSectionsByCourse(courseId);
    if (!sections) {
      throw new Error("Sections not found");
    }
    const sectionsData = sections.map((section, index: number) => ({
      id: index + 1,
      section: section.position,
      name: section.name,
      visible: section.visible ? 1 : 0,
      availability: section.availability,
    }));
    if (sectionsData.length === 0) {
      return;
    }
    const payload: CourseSectionCreatedEvent = {
      data: {
        uuid: migrationCourse.uuid!,
        sections: sectionsData,
      },
    };
    await RabbitMQPublisher.publishData(payload, "course-section-created");
    return;
  }
}
