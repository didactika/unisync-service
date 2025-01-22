import BaseEvent from "../../../core/events/internal/base-event";
import { GroupsCourseMigrationCreatedEventData } from "../types/events/groups-course-migration-created";

export default class GroupsCourseMigrationCreated extends BaseEvent<GroupsCourseMigrationCreatedEventData> {
  constructor(groupsCourse: GroupsCourseMigrationCreatedEventData) {
    super(groupsCourse);
  }
}
