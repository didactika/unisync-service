import { BaseAttributes } from "../../../../db/types/base-attributes";
import { EUserRole } from "../../../enums/user-role-enum";

export type UserAttributes = BaseAttributes & {
    uuid?: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: EUserRole;
  };
  
  export type UserCreationAttributes = Omit<UserAttributes, 'id'>;
  