import { Events as CourseEvents } from "../../db/events";
import BaseEventEmitter from "../../../../core/events/classes/base-event-emiter";
import SectionController from "../controllers/section-controller";
import CourseCampusCreated from "../../events/course-campus-created-event";

const observer = () => {
  BaseEventEmitter.onEvent(CourseEvents.CourseCampusCreated, async (data: CourseCampusCreated) => {
    const courseData = data.data;
    if (!courseData.id) return;
    SectionController.syncFromCampus(courseData.courseId);
  });
}

export default { observer};
