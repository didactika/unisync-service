import { BaseAttributes } from "../base-attributes";

export type CategoryAttributes = BaseAttributes & {
  name: string;
  idnumber?: string;
  idOnCampus: number;
  campusId: number;
};

export type CategoryCreationAttributes = Omit<CategoryAttributes, "id">;