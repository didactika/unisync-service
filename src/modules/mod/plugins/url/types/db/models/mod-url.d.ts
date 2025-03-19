import {BaseAttributes} from "../../../../../core/db/types/base-attributes";


export type UrlModuleAttributes = BaseAttributes & {
    name: string;
    intro: string;
    idnumber: string;
    visible: number;
    showDescription: number;
    groupMode: number;
    externalUrl: string;
    display: number;
    displayOptions: string;
    parameters: string;
};

export type UrlModuleCreationAttributes = Omit<UrlModuleAttributes, "id">;
