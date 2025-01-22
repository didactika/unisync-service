import { BaseAttributes } from "../../../../../core/db/types/base-attributes";
import { EMigrationStatus } from "../../../../../core/enums/migration-status-enum";

export type CourseMigrationInformationAttributes = BaseAttributes & {
  uuid?: string;
  courseId?: number;
  courseOriginId: number;
  courseTargetId?: number;
  courseTemplateId?: number;
  campusOriginId: number;
  campusTargetId: number;
  status: EMigrationStatus;
};

export type CourseMigrationInformationCreationAttributes = Omit<CourseMigrationInformationAttributes, "id">;
