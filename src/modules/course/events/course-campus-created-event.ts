import BaseEvent from "../../../core/events/internal/base-event";
import { CourseCampusCreatedEventData } from "../types/events/internal/course-campus-created";

export default class CourseCampusCreated extends BaseEvent<CourseCampusCreatedEventData> {
  constructor(courseCampus: CourseCampusCreatedEventData) {
    super(courseCampus);
  }
}
