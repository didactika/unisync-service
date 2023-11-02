import IUser from "../../interfaces/models-interfaces/user-interfaces";

/**
 * @type UserFilter
 * @description The user filter for the read methods
 */
export type UserFilter = {
    id?: string;
    uuid?: string;
    username?: string;
    email?: string;
}

/**
 * @type UserFormatedResponse
 * @description The user formated response for the read methods
 */
export type UserFormatedResponse = IUser;