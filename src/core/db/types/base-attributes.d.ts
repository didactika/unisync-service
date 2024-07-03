export type BaseAttributes = {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type BaseCreationAttributes = Omit<BaseAttributes, "id">;