import { UserCreationAttributes } from "../../db/models/user";

export interface IUser extends UserCreationAttributes {
  id?: number;
  uuid?: string;
}
