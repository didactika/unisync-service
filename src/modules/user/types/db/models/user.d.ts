export type UserAttributes = {
    id: number;
    uuid: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  
  export type UserCreationAttributes = Omit<UserAttributes, 'id' | 'uuid'>;
  