import RabbitMQPublisher from "../../../../core/events/message-broker/classes/rabbitmq/publisher/publisher";
import CourseMigrationController from "../../../course/classes/controllers/course-migration-controller";
import { IGroup } from "../../../group/types/classes/entities/group-interface";
import { CourseGroupingsCreatedEvent } from "../../types/events/message-broker/course-groupings-created";
import GroupingController from "./grouping-controller";
import GroupingGroupController from "./grouping-group-controller";

export default class GroupingMigrationController {
  static async migrateGroupings(courseId: number, groups: IGroup[]): Promise<void> {
    const migrationCourse = await CourseMigrationController.getMigrationCourse(courseId!);
    if (!migrationCourse) {
      throw new Error("Migration course not found");
    }
    //TODO: add logic template course
    const newGroupings = await GroupingController.getByCourse(migrationCourse.courseOriginId);
    if (!newGroupings) {
      throw new Error("Groupings not found");
    }

    for (const grouping of newGroupings) {
      const newGrouping = await GroupingController.create(courseId!, {
        ...grouping,
        id: undefined,
      });

      await GroupingGroupController.createByGroups(
        newGrouping.id!,
        groups.map((group) => group.id!)
      );
    }
    return;
  }

  public static async finishMigration(courseId: number): Promise<void> {
    const courseMigrationFound = await CourseMigrationController.getMigrationCourse(courseId);
    if (!courseMigrationFound) {
      throw new Error("Migration course not found");
    }
    const groupings = await GroupingController.getByCourse(courseId);
    if (!groupings) return;
    const groupingsData = groupings.map((grouping) => ({
      name: grouping.name,
      idnumber: grouping.idnumber ?? "",
      description: grouping.idnumber ?? "",
    }));
    if (groupingsData.length === 0) return;
    const payload: CourseGroupingsCreatedEvent = {
      data: {
        uuid: courseMigrationFound.uuid!,
        groupings: groupingsData,
      },
    };
    await RabbitMQPublisher.publishData(payload, "course-groupings-created");
  }
}
