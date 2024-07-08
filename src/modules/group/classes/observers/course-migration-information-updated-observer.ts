import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";
import { CourseEvents } from "../../../course/db/events";
import CourseMigrationInformationUpdated from "../../../course/events/course-migration-information-updated-event";
import GroupMigrationController from "../controllers/group-migration-controller";

const observer = () => {
  BaseEventEmitter.onEvent(CourseEvents.CourseMigrationInformationUpdated, async (data: CourseMigrationInformationUpdated) => {
    const courseData = data.data;
    if (courseData.newData.courseId) {
      await GroupMigrationController.migrateGroups(courseData.newData.courseId);
    }
  });
};

export default { observer };
