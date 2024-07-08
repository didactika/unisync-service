import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";
import CourseMigrationController from "../../../course/classes/controllers/course-migration-controller";
import GroupsCourseMigrationCreated from "../../events/groups-course-migration-created";
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
}
