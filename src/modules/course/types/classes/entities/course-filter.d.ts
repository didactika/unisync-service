import { ECourseType } from "../../../enums/course-type-enum";

export type CourseFilter = {
  id?: number;
  uuid?: string;
  type?: ECourseType;
  fullname?: string;
  shortname?: string;
  idnumber?: string;
  createdAt?: string;
  updatedAt?: string;
};