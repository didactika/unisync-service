export type CourseModCreatedEvent = {
  data: {
    uuid: string;
    modtype: "url";
    name: string;
    externalurl: string;
    section: number;
  };
};
