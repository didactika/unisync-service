export type CourseGroupingsCreatedEvent = {
  data: {
    uuid: string;
    groupings: {
      name: string;
      idnumber: string;
      description: string;
    }[];
  };
};
