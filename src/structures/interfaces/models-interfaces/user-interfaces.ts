
/**
 * User model interface
 * @interface IUser
 * @description This interface is used to define the user
 */
export default interface IUser {
    id?: string;
    uuid?: string;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
}