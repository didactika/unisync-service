import { CourseCreationAttributes } from "../../db/models/course";

export interface ICourse extends CourseCreationAttributes {
  id?: number;
  uuid?: string;
}

export type CourseFilter = Partial<ICourse>;
