import BaseEvent from "../../../core/events/internal/base-event";
import { CourseCreatedEventData } from "../types/events/course-created";

export default class CourseCreated extends BaseEvent<CourseCreatedEventData> {
  constructor(course: CourseCreatedEventData) {
    super(course);
  }
}
