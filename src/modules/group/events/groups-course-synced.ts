import BaseEvent from "../../../core/events/internal/base-event";
import { GroupsCourseSyncedEventData } from "../types/events/groups-course-synced";

export default class GroupsCourseSynced extends BaseEvent<GroupsCourseSyncedEventData> {
  constructor(groupsCourse: GroupsCourseSyncedEventData) {
    super(groupsCourse);
  }
}
