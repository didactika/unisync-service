import BaseEvent from "../../../core/events/internal/base-event";
import { CourseMigrationInformationUpdatedEventData } from "../types/events/internal/course-migration-information-updated";

export default class CourseMigrationInformationUpdated extends BaseEvent<CourseMigrationInformationUpdatedEventData> {
  constructor(courseMigrationInformation: CourseMigrationInformationUpdatedEventData) {
    super(courseMigrationInformation);
  }
}
