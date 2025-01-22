import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";
import { CourseEvents } from "../../../course/db/events";
import CourseMigrationFinish from "../../../course/events/course-migration-finish-event";
import GroupingMigrationController from "../controllers/grouping-migration-controller";

const observer = () => {
  BaseEventEmitter.onEvent(CourseEvents.CourseMigrationFinish, async (data: CourseMigrationFinish) => {
    const courseData = data.data;
    await GroupingMigrationController.finishMigration(courseData.courseId);
  });
};

export default { observer };
