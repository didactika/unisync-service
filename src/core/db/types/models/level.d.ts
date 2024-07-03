export type LevelAttributes = {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type LevelCreationAttributes = Omit<LevelAttributes, "id">;
