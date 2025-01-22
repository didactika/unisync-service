export type CourseMigrationCreatedEventData = {
    id?: number;
    uuid?: string;
    courseId?: number;
    courseOriginId: number;
    courseTargetId?: number;
    courseTemplateId?: number;
    campusOriginId: number;
    campusTargetId: number;
  };