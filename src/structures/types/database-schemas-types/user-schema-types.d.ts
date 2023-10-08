/**
 * @interface IMUser
 * @description Mongoose User Interface
 */
export default interface IMUser extends Omit<IUserModel, "id"> {
    _id: Types.ObjectId
}