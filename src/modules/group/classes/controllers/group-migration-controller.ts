import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";
import RabbitMQPublisher from "../../../../core/events/message-broker/classes/rabbitmq/publisher/publisher";
import CourseMigrationController from "../../../course/classes/controllers/course-migration-controller";
import GroupsCourseMigrationCreated from "../../events/groups-course-migration-created";
import { CourseGroupsCreatedEvent } from "../../types/events/message-broker/course-groups-created";
import GroupController from "./group-controller";

export default class GroupMigrationController {
  public static async migrateGroups(courseId: number): Promise<void> {
    const migrationCourse = await CourseMigrationController.getMigrationCourse(courseId!);
    if (!migrationCourse) {
      throw new Error("Migration course not found");
    }
    //TODO: add logic template course
    const newGroups = await GroupController.getByCourse(migrationCourse.courseOriginId);
    if (!newGroups) {
      throw new Error("Groups not found");
    }
    const groups = [];
    for (const group of newGroups) {
      groups.push(
        await GroupController.create(courseId!, {
          ...group,
          id: undefined,
        })
      );
    }
    BaseEventEmitter.emitEvent(
      new GroupsCourseMigrationCreated({
        courseId,
        groups,
      })
    );
    return;
  }

  public static async finishMigration(courseId: number): Promise<void> {
    const courseMigrationFound = await CourseMigrationController.getMigrationCourse(courseId);
    if (!courseMigrationFound) {
      throw new Error("Migration course not found");
    }
    const groups = await GroupController.getByCourse(courseId);
    if (!groups) return;
    const groupsData = groups.map((group) => ({
      name: group.name,
      idnumber: group.idnumber ?? "",
      description: group.description ?? "",
    }));
    if (groupsData.length === 0) return;
    const payload: CourseGroupsCreatedEvent = {
      data: {
        uuid: courseMigrationFound.uuid!,
        groups: groupsData,
      },
    };

    await RabbitMQPublisher.publishData(payload, "course-groups-created");
  }
}
