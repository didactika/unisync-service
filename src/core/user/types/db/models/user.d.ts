import { BaseAttributes } from "../../../../db/types/base-attributes";

export type UserAttributes = BaseAttributes & {
    uuid: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  
  export type UserCreationAttributes = Omit<UserAttributes, 'id' | 'uuid'>;
  