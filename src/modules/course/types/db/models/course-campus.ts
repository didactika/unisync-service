import { BaseAttributes } from "../../../../../core/db/types/base-attributes";

export type CourseCampusAttributes = BaseAttributes & {
  campusId: number;
  courseId: number;
  categoryId: number;
  idOnCampus: number;
};

export type CourseCampusCreationAttributes = Omit<CourseCampusAttributes, "id">;
