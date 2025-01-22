import { BaseAttributes } from "../../../../../core/db/types/base-attributes";
import { ECourseType } from "../../../enums/course-type-enum";

export type CourseAttributes = BaseAttributes & {
  uuid?: string;
  type: ECourseType;
  fullname: string;
  shortname: string;
  idnumber?: string;
};

export type CourseCreationAttributes = Omit<CourseAttributes, "id">;
