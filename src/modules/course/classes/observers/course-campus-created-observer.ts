import { CourseEvents } from "../../db/events";
import SectionController from "../controllers/section-controller";
import CourseCampusCreated from "../../events/course-campus-created-event";
import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";

const observer = () => {
  BaseEventEmitter.onEvent(CourseEvents.CourseCampusCreated, async (data: CourseCampusCreated) => {
    const courseData = data.data;
    if (!courseData.courseId) return;
    SectionController.syncFromCampus(courseData.courseId);
  });
}

export default { observer};
