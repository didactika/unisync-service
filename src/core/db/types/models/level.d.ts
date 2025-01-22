import { BaseAttributes } from "../base-attributes";

export type LevelAttributes = BaseAttributes & {
  name: string;
};

export type LevelCreationAttributes = Omit<LevelAttributes, "id">;
