import { Types } from "mongoose";

export default interface IUserModel {
    id?: string;
    uuid?: string;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
}