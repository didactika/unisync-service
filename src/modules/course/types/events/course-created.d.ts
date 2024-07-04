export type CourseCreatedEventData = {
  uuid?: string;
  type: ECourseType;
  fullname: string;
  shortname: string;
  idnumber?: string;
};