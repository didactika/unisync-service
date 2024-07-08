import { EMigrationStatus } from "../../../../../core/enums/migration-status-enum";

export interface ICourseMigrationInformation {
    id?: number;
    uuid?: string;
    courseId?: number;
    courseOriginId: number;
    courseTargetId?: number;
    courseTemplateId?: number;
    campusOriginId: number;
    campusTargetId: number;
    status?: EMigrationStatus; 
    createdAt?: Date;
    updatedAt?: Date;
}

export type CourseMigrationInformationFilter = Partial<ICourseMigrationInformation>;