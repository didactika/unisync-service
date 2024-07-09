export type CourseBaseCreatedEvent = {
  data: {
    uuid: string;
    header: {
      general: {
        category: number;
        fullname: string;
        shortname: string;
        idnumber?: string;
      };
    };
  };
};
