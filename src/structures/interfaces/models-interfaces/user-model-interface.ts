
/**
 * User model interface
 * @interface IUserModel
 * @description This interface is used to define the user model
 */
export default interface IUserModel {
    id?: string;
    uuid?: string;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
}