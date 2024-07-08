import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";
import { CourseEvents } from "../../db/events";
import CourseMigrationInformationUpdated from "../../events/course-migration-information-updated-event";
import SectionMigrationController from "../controllers/section-migration-controller";

const observer = () => {
  BaseEventEmitter.onEvent(CourseEvents.CourseMigrationInformationUpdated, async (data: CourseMigrationInformationUpdated) => {
    const courseData = data.data;
    if (courseData.newData.courseId) {
      await SectionMigrationController.create(courseData.newData.courseId);
    }
  });
};

export default { observer };
