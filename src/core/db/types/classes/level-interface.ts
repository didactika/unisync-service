import { LevelCreationAttributes } from "../db/models/level";

export interface ILevel extends LevelCreationAttributes {
  id?: number;
}
