export type CourseCreatedEventData = {
  id?: number;
  uuid?: string;
  type: ECourseType;
  fullname: string;
  shortname: string;
  idnumber?: string;
};