import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";
import GroupsCourseSynced from "../../../group/events/groups-course-synced";
import GroupingController from "../controllers/grouping-controller";

const observer = () => {
  BaseEventEmitter.onEvent(GroupsCourseSynced, async (data: GroupsCourseSynced) => {
    const courseData = data.data;
    if (!courseData.courseId) return;
    await GroupingController.syncFromCampus(courseData.courseId);
  });
};

export default { observer };
