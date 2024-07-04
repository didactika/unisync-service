export type GetCategoryResponse = {
    id: number;
    name: string;
    idnumber?: string;
    description: string;
    descriptionformat: number;
    parent: number;
    sortorder: number;
    coursecount: number;
    visible?: number;
    visibleold?: number;
    timemodified?: number;
    depth: number;
    path: string;
    theme?: string;
};