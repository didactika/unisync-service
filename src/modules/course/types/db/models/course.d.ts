import { BaseAttributes } from "../../../../../core/db/types/base-attributes";

export type CourseAttributes = BaseAttributes & {
  uuid?: string;
  type: ECourseType;
  fullname: string;
  shortname: string;
  idnumber?: string;
  availability?: string;
};

export type CourseCreationAttributes = Omit<CourseAttributes, "id">;
