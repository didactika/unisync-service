export type CourseModCreatedEvent = {
  data: {
    uuid: string;
    modtype: string;
    name: string;
    externalurl: string;
    section: number;
  };
};
