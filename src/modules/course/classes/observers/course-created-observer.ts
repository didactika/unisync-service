import { Events as CourseEvents } from "../../../../core/campus/db/events";
import BaseEventEmitter from "../../../../core/events/classes/base-event-emiter";
import CourseCreated from "../../events/course-created-event";
import CourseCampusController from "../controllers/course-campus-controller";

export function observer() {
  BaseEventEmitter.onEvent(CourseEvents.CourseCreated, async (data: CourseCreated) => {
    const courseData = data.data;
    await CourseCampusController.importCourseCampusData(courseData);
  });
}
