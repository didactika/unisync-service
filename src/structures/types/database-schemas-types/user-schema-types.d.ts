import { Types } from "mongoose";
import IUser from "../../interfaces/models-interfaces/user-interfaces";

/**
 * @interface IMUser
 * @description Mongoose User Interface
 */
export interface IMUser extends Omit<IUser, "id"> {
    _id: Types.ObjectId
}