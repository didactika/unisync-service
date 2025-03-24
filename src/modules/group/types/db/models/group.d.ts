import {BaseAttributes} from "../../../../../core/db/types/base-attributes";

export type GroupAttributes = BaseAttributes & {
    name: string;
    idnumber?: string;
    description?: string;
    idOnCampus?: number;
    courseId: number;
};

export type GroupCreationAttributes = Omit<GroupAttributes, "id">;