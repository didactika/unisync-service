import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";
import GroupsCourseMigrationCreated from "../../../group/events/groups-course-migration-created";
import GroupingMigrationController from "../controllers/grouping-migration-controller";

const observer = () => {
  BaseEventEmitter.onEvent(GroupsCourseMigrationCreated, async (data: GroupsCourseMigrationCreated) => {
    const courseData = data.data;
    if (courseData.courseId && courseData.groups.length > 0) {
      await GroupingMigrationController.migrateGroupings(courseData.courseId, courseData.groups);
    }
  });
};

export default { observer };
