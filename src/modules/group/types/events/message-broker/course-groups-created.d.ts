export type CourseGroupsCreatedEvent = {
  data: {
    uuid: string;
    groups: {
      name: string;
      idnumber: string;
      description: string;
    }[];
  };
};
