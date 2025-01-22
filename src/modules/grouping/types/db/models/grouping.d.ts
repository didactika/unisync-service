import { BaseAttributes } from "../../../../../core/db/types/base-attributes";

export type GroupingAttributes = BaseAttributes & {
    name: string;
    idnumber?: string;
    idOnCampus: number;
    courseId: number;
  };
  
  export type GroupingCreationAttributes = Omit<GroupingAttributes, "id">;