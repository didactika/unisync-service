import IUser from "../../interfaces/models-interfaces/user-interfaces";

/**
 * @interface IMUser
 * @description Mongoose User Interface
 */
export default interface IMUser extends Omit<IUser, "id"> {
    _id: Types.ObjectId
}