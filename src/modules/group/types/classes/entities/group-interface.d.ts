export interface IGroup {
    id?: number;
    idnumber?: string;
    name: string;
    description?: string;
    idOnCampus?: number;
    courseId: number;
    createdAt?: Date;
    updatedAt?: Date;
}