export type CourseSectionCreatedEvent = {
  data: {
    uuid: string;
    sections: {
      id: number;
      section: number;
      name: string;
      visible: number;
      availability: string | null;
    }[];
  };
};
