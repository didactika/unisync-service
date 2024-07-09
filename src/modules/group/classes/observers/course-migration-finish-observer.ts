import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";
import { CourseEvents } from "../../../course/db/events";
import CourseMigrationFinish from "../../../course/events/course-migration-finish-event";
import GroupMigrationController from "../controllers/group-migration-controller";

const observer = () => {
  BaseEventEmitter.onEvent(CourseEvents.CourseMigrationFinish, async (data: CourseMigrationFinish) => {
    const courseData = data.data;
    await GroupMigrationController.finishMigration(courseData.courseId);
  });
};

export default { observer };
