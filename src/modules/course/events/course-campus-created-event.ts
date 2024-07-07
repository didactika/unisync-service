import BaseEvent from "../../../core/events/base-event";
import { CourseCampusCreatedEventData } from "../types/events/course-campus-created";

export default class CourseCampusCreated extends BaseEvent<CourseCampusCreatedEventData> {
  constructor(courseCampus: CourseCampusCreatedEventData) {
    super(courseCampus);
  }
}
