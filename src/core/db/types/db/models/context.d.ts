export type ContextAttributes = {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ContextCreationAttributes = Omit<ContextAttributes, "id">;
