import { BaseAttributes } from "../../../../../core/db/types/base-attributes";

export type SectionAttributes = BaseAttributes & {
  courseId: number;
  name: string;
  position: number;
  visible: boolean;
  availability: string;
};

export type SectionCreationAttributes = Omit<SectionAttributes, "id">;