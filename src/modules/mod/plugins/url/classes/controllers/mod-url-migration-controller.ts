import RabbitMQPublisher from "../../../../../../core/events/message-broker/classes/rabbitmq/publisher/publisher";
import CourseMigrationController from "../../../../../course/classes/controllers/course-migration-controller";
import SectionController from "../../../../../course/classes/controllers/section-controller";
import { CourseModCreatedEvent } from "../../../../types/events/message-broker/course-mod-created";
import EkkoConnector from "../external/ekko-connector";

export default class ModUrlMigrationController {
  public static async finishMigration(courseId: number) {
    const courseMigrationFound = await CourseMigrationController.getMigrationCourse(courseId);
    if (!courseMigrationFound) {
      throw new Error("Migration course not found");
    }
    const sections = await SectionController.getSectionsByCourse(courseId);
    if (!sections) {
      throw new Error("Sections not found");
    }
    let sectionFound = sections.find((section) => section.name.indexOf("recursos_aprendizaje") !== -1);
    console.log(sectionFound);
    
    if (!sectionFound) {
      sectionFound = sections[0];
    }
    const requiredResources = await EkkoConnector.getRequiredResources(courseId);
    if (!requiredResources) return;
    for (const resource of requiredResources) {
      const payload: CourseModCreatedEvent = {
        data: {
          uuid: courseMigrationFound.uuid!,
          section: sectionFound.position +1,
          modtype: "url",
          name: resource.name,
          externalurl: resource.url,
        },
      };
      await RabbitMQPublisher.publishData(payload, "course-mod-created");
    }
    return;
  }
}
