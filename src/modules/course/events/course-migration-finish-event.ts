import BaseEvent from "../../../core/events/internal/base-event";
import { CourseMigrationFinishEventData } from "../types/events/internal/course-migration-finish";

export default class CourseMigrationFinish extends BaseEvent<CourseMigrationFinishEventData> {
  constructor(courseMigration: CourseMigrationFinishEventData) {
    super(courseMigration);
  }
}
