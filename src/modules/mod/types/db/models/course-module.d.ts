import { BaseAttributes } from "../../../../../core/db/types/base-attributes";


export type CourseModuleAttributes = BaseAttributes & {
  courseId: number;
  moduleId: number;
  instanceId: number;
  sectionId: number;
  position: number;
};

export type CourseModuleCreationAttributes = Omit<CourseModuleAttributes, "id">;
