import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";
import { CourseEvents } from "../../db/events";
import CourseMigrationFinish from "../../events/course-migration-finish-event";
import CourseMigrationController from "../controllers/course-migration-controller";
import SectionMigrationController from "../controllers/section-migration-controller";

const observer = () => {
  BaseEventEmitter.onEvent(CourseEvents.CourseMigrationFinish, async (data: CourseMigrationFinish) => {
    const courseData = data.data;
    await CourseMigrationController.finishMigrationCourse(courseData.courseId);
    await SectionMigrationController.finishMigration(courseData.courseId);
  });
};

export default { observer };
