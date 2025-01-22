import { IGroup } from "../classes/entities/group-interface";

export type GroupsCourseSyncedEventData = {
  courseId: number;
  groups: IGroup[];
};
