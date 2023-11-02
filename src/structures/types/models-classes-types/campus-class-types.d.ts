import ICampus from "../../interfaces/models-interfaces/campus-interfaces";

/**
 * @type CampusFilter
 * @description The campus filter for the read methods
 */
export type CampusFilter = {
    id?: string;
    uuid?: string;
    name?: string;
    url?: string;
}

/**
 * @type CampusFormatedResponse
 * @description The campus formated response for the read methods
 */
export type CampusFormatedResponse = ICampus