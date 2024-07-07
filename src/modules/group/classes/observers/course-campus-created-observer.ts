import BaseEventEmitter from "../../../../core/events/base-event-emiter";
import { CourseEvents } from "../../../../modules/course/db/events";
import CourseCampusCreated from "../../../course/events/course-campus-created-event";
import GroupController from "../controllers/group-controller";

const observer = () => {
  BaseEventEmitter.onEvent(CourseEvents.CourseCampusCreated, async (data: CourseCampusCreated) => {
    const courseData = data.data;
    if (!courseData.courseId) return;
    await GroupController.syncFromCampus(courseData.courseId);
  });
}

export default { observer};
