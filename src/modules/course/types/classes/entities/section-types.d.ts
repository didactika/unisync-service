import { SectionCreationAttributes } from "../../db/models/section";

export interface ISection extends SectionCreationAttributes {
  id?: number;
}

export type SectionFilter = Partial<ISection>;
