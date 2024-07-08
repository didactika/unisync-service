import { IGroup } from "../classes/entities/group-interface";

export type GroupsCourseMigrationCreatedEventData = {
  courseId: number;
  groups: IGroup[];
};
